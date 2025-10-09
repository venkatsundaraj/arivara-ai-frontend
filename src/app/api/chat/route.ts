import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { ChatHistoryItem, MyUIMessage } from "@/server/api/routers/chat-router";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { getCurrentUser } from "@/lib/session";
import { getAccount } from "@/server/api/routers/utils/get-account";
import { env } from "@/env";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOpenAI } from "@ai-sdk/openai";
import {
  generateText,
  convertToModelMessages,
  streamText,
  createUIMessageStream,
  stepCountIs,
  createIdGenerator,
  smoothStream,
  createUIMessageStreamResponse,
} from "ai";
import { XmlPrompt } from "@/lib/xml-prompt";
import { format } from "date-fns";

const messageSchema = z.object({
  message: z.any(),
  id: z.string(),
});

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: env.GROQ_API_KEY,
});

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getCurrentUser();

    if (!session?.user.email) {
      throw new Error("unauthorized");
    }

    const { data } = messageSchema.safeParse(body);
    if (!data) {
      throw new Error("Something went wrong here");
    }

    const { id, message } = data as { id: string; message: MyUIMessage };
    // console.log(id, message);

    //ratelimiter
    const limiter =
      session?.user.plan === "pro"
        ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(40, "4h") })
        : new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(5, "1d") });

    //getting the necessary functions
    const [account, history, limitResult] = await Promise.all([
      getAccount(session.user.email),
      redis.get<MyUIMessage[]>(`chat:history:${id}`),
      limiter.limit(session.user.email),
    ]);

    if (env.NODE_ENV === "production") {
      const { success } = limitResult;

      if (!success) {
        if (session.user.plan === "pro") {
          throw new Error(
            "You've reached your hourly message limit. Please try again in a few hours."
          );
        } else {
          throw new Error(
            "Free plan limit reached, please upgrade to continue."
          );
        }
      }
    }
    if (!account) {
      throw new Error("No account connected");
    }

    const userContent = message.parts.reduce(
      (acc, cur) => (cur.type === "text" ? acc + cur.text : ""),
      ""
    );

    const content = new XmlPrompt();
    content.open("message", { date: format(new Date(), "EEEE yyyy-MM-dd") });
    content.tag("user_message", userContent);

    //i don't understand this.
    if (!history || history.length === 0) {
      const memories = await redis.lrange(`memories:${account.id}`, 0, -1);

      content.tag("history", memories.join("\n"), {
        note: "These are memories you have about this user. These have been attached by the SYSTEM, not by the USER.",
      });
    }

    content.close("message");
    // not included the raw messages here.
    const userMessage: MyUIMessage = {
      ...message,
      parts: [{ type: "text", text: userContent }],
    };

    console.log("user-msg", userMessage);

    const messages = [...(history ?? []), userMessage] as MyUIMessage[];

    const stream = createUIMessageStream<MyUIMessage>({
      originalMessages: messages,
      generateId: createIdGenerator({
        prefix: "msg",
        size: 16,
      }),
      onFinish: async ({ messages }) => {
        await redis.set(`chat:history:${id}`, messages);
        await redis.del(`website_contents:${id}`);

        const historyKey = `chat:history-list:${session.user.email}`;
        const existingHistory =
          (await redis.get<ChatHistoryItem[]>(historyKey)) || [];

        const chatHistoryItem: ChatHistoryItem = {
          id,
          title: messages[0].metadata?.userMessage || "unnamed chat",
          lastUpdated: new Date().toISOString(),
        };

        await redis.set(historyKey, [
          chatHistoryItem,
          ...existingHistory.filter((item) => item.id !== id),
        ]);
      },
      onError(error) {
        console.log("Error", JSON.stringify(error, null, 2));
        throw new Error("Something went wrong");
      },
      execute: async ({ writer }) => {
        const result = streamText({
          model: openrouter.chat("openai/gpt-4.1", {
            models: ["openai/gpt-4o"],
            reasoning: { enabled: false, effort: "low" },
          }),

          messages: convertToModelMessages(messages),
          stopWhen: stepCountIs(5),
          experimental_transform: smoothStream({
            delayInMs: 20,
            chunking: /[^-]*---/,
          }),
        });

        writer.merge(result.toUIMessageStream());
      },
    });

    // console.log("result", result.text); // This will log the actual text

    return createUIMessageStreamResponse({ stream });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Something went wrong" },
      { status: 500 }
    );
  }
}

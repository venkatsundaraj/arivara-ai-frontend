import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { MyUIMessage } from "@/server/api/routers/chat-router";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { getCurrentUser } from "@/lib/session";
import { getAccount } from "@/server/api/routers/utils/get-account";
import { env } from "@/env";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText, convertToModelMessages, streamText } from "ai";
import { XmlPrompt } from "@/lib/xml-prompt";

const messageSchema = z.object({
  message: z.any(),
  id: z.string(),
});

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: env.GROQ_API_KEY,
});

export async function POST(req: NextRequest, res: NextResponse) {
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
    console.log(id, message);

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

      if (!account) {
        throw new Error("No account connected");
      }
    }

    const userContent = message.parts.reduce(
      (acc, cur) => (cur.type === "text" ? acc + cur.text : ""),
      ""
    );

    const content = new XmlPrompt();

    const resultOne = content.tag("message", userContent);

    console.log(content, resultOne);

    const messages = [...(history ?? []), message];

    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      messages: convertToModelMessages(messages),
    });

    // console.log(result.text); // This will log the actual text

    return NextResponse.json({ text: result.text });
  } catch (err) {
    console.log(err);
  }
}

import { email, z } from "zod";
import { nanoid } from "nanoid";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { inputValidatorSchema } from "@/lib/validation/input-validator";
import { auth } from "@/lib/auth";
import { TRPCError } from "@trpc/server";
import { UIMessage } from "ai";
import { getCurrentUser } from "@/lib/session";
import { redis } from "@/lib/redis";

const data: { id: string; text: string; response: string }[] = [
  {
    id: "hello",
    text: "hello",
    response:
      "galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
];
const defResponse =
  "Lorem Ipsum is simply dummy text of the printing and tca galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export type Metadata = {
  userMessage: string;
  // attachments: Array<TAttachment>; // I have to find a way to incorpoate this
  // tweets: PayloadTweet[];
};

export type MyUIMessage = UIMessage<
  Metadata,
  {
    "main-response": {
      text: string;
      status: "streaming" | "complete";
    };
    "tool-output": {
      text: string;
      status: "processing" | "streaming" | "complete";
    };
    "tool-reasoning": {
      text: string;
      status: "processing" | "reasoning" | "complete";
    };
    write_tweet: {
      status: "processing";
    };
  },
  {
    read_website_content: {
      input: { website_url: string };
      output: {
        url: string;
        title: string;
        content: string;
      };
    };
  }
>;

export type ChatHistoryItem = {
  id: string;
  lastUpdated: string;
  title: string;
};

export const chatRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createChat: publicProcedure
    .input(inputValidatorSchema)
    .mutation(async ({ input, ctx }) => {
      const session = await getCurrentUser();
      if (!session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please Login to enter your data",
        });
      }

      if (!input.chatId) {
        const id = nanoid();
        data.push({ id: id, text: input.text, response: defResponse });
        return {
          success: true,
          chatId: id,
          messages: {
            id: id,
            text: input.text,
            response: defResponse,
          },
        };
      }

      data.push({
        id: input.chatId,
        text: input.text,
        response: defResponse,
      });
      //id creation

      return {
        success: true,
        chatId: input.chatId,
        messages: { id: input.chatId, text: input.text, response: defResponse },
      };
    }),
  getMessages: privateProcedure.query(async () => {
    console.log("server", data);
    return data;
  }),

  //actual app
  chat: privateProcedure
    .input(z.object({ messages: z.any(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input, "input");
    }),

  getChatHistories: privateProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      if (!id) {
        return { messages: [] as MyUIMessage[] };
      }

      const messages = await redis.get<MyUIMessage[]>(`chat:history:${id}`);

      if (!messages) {
        return { messages: [] as MyUIMessage[] };
      }

      return { messages };
    }),
  getListofChats: privateProcedure.query(async ({ ctx }) => {
    const chatHistoryList = await redis.get<ChatHistoryItem[]>(
      `chat:history-list:${ctx.user.email}`
    );

    if (!chatHistoryList || chatHistoryList.length === 0) {
      throw new Error("there are no histories at the moment");
    }

    return chatHistoryList;
  }),
  checkIdFromEmail: privateProcedure
    .input(z.object({ email: z.string(), id: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(input);
      const chatHistoryList = await redis.get<ChatHistoryItem[]>(
        `chat:history-list:${email}`
      );

      if (!chatHistoryList || chatHistoryList.length === 0) {
        throw new Error("there are no histories at the moment");
      }
      const filteredChat = chatHistoryList?.filter(
        (item) => item.id === input.id
      );

      if (!filteredChat || filteredChat.length === 0) {
        throw new Error(
          "there are no histories at the moment, please enter the correct id"
        );
      }

      return filteredChat;
    }),
});

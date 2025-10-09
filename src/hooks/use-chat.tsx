"use client";

import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useChat } from "@ai-sdk/react";
import { MyUIMessage } from "@/server/api/routers/chat-router";
import { nanoid } from "nanoid";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { User } from "@/server/db/schema";

interface ChatContextProps extends ReturnType<typeof useChat<MyUIMessage>> {
  startNewMessage: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextProps | null>(null);

export const ChatProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultValue = nanoid();
  const [chatId, setChatId] = useState<string>(defaultValue);
  const [userEmail, setUserEmail] = useState<string>();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // useEffect(() => {
  //   async function getAccount() {
  //     const session = await authClient.getSession();
  //     // console.log(session.data?.user.email);
  //     setUserEmail(session.data?.user.email);
  //   }
  //   getAccount();
  // }, []);

  const chatProps = useChat<MyUIMessage>({
    id: chatId,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest({ messages, id }) {
        return { body: { message: messages[messages.length - 1], id } };
      },
    }),
    messages: [],
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const { data } = api.chat.getChatHistories.useQuery({ id: params.id });

  const startNewMessage = useCallback(async function (text: string) {
    try {
      console.log(params.id);
      if (params.id) {
        await chatProps.sendMessage({ text: text });
      }
      if (!params.id) {
        setChatId(defaultValue);
        console.log(defaultValue, chatId);
        if (!text) {
          throw new Error("You have to enter the message");
        }

        await chatProps.sendMessage({ text: text });

        return router.push(`/chat/${defaultValue}`);
      }

      // if (!data?.messages) {
      //   throw new Error("Something went wrong");
      // }
    } catch (err) {
      toast.error("something went wrong");
    }

    return Promise.resolve();
  }, []);

  useEffect(() => {
    console.log(data?.messages);
    if (data?.messages) {
      chatProps.setMessages(data?.messages);
    }
  }, [data]);

  const context = useMemo(() => {
    return {
      ...chatProps,
      startNewMessage: startNewMessage,
    };
  }, [chatProps, startNewMessage]);

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
};

export const useChatContext = function () {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("Context should be wrapped by the children");
  }
  return context;
};

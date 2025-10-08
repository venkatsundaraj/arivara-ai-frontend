"use client";

import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useChat } from "@ai-sdk/react";
import { MyUIMessage } from "@/server/api/routers/chat-router";
import { nanoid } from "nanoid";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";

interface ChatContextProps extends ReturnType<typeof useChat<MyUIMessage>> {
  startNewChat: (id: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextProps | null>(null);

const defaultValue = nanoid();

export const ChatProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatId, setChatId] = useState<string>();

  const startNewChat = useCallback(async function (id: string) {
    setChatId(defaultValue);
    return Promise.resolve();
  }, []);

  const chatProps = useChat<MyUIMessage>({
    id: "hello world",
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

    // onError: ({ message }) => {
    //   console.log(message);
    //   toast.error(message);
    // },
  });

  // useEffect(() => {
  //   chatProps.sendMessage();
  // }, []);

  const context = useMemo(() => {
    return {
      ...chatProps,
      startNewChat: startNewChat,
    };
  }, [chatProps, startNewChat]);

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

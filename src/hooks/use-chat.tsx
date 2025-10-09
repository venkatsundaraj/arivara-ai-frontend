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
import { useAccount } from "@/app/_components/providers/account-provider";

interface ChatContextProps extends ReturnType<typeof useChat<MyUIMessage>> {
  startNewMessage: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextProps | null>(null);
const defaultValue = nanoid();
export const ChatProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatId, setChatId] = useState<string>(defaultValue);
  const [user, setUser] = useState<User>();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const session = useSession();
  const utils = api.useUtils();
  const acc = useAccount();

  const { data } = api.chat.getChatHistories.useQuery(
    { id: params.id as string },
    {
      enabled: Boolean(params.id && session),
      refetchOnMount: true,
      staleTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  const chatProps = useChat<MyUIMessage>({
    id: params.id ?? chatId,
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

  const startNewMessage = useCallback(
    async function (text: string) {
      try {
        if (!text) {
          toast.error("You have to enter the message", {
            position: "top-center",
          });
          return;
        }

        const sessionRes = await authClient.getSession();
        const currentUser = sessionRes.data?.user as User;
        setUser(currentUser);

        if (!currentUser?.email) {
          toast.error("Please authenticate...", { position: "top-center" });
          return;
        }
        if (params.id) {
          await chatProps.sendMessage({ text: text });
          utils.chat.getListofChats.invalidate();
        }
        if (!params.id) {
          setChatId(defaultValue);

          await chatProps.sendMessage({ text: text });
          utils.chat.getListofChats.invalidate();
          return router.push(`/chat/${defaultValue}`);
        }
      } catch (err) {
        console.log(err);
        toast.error("something went wrong");
      }

      return Promise.resolve();
    },
    [
      acc,
      session,
      chatProps,
      params.id,
      utils.chat.getListofChats,
      router,
      defaultValue,
    ]
  );

  useEffect(() => {
    console.log(data?.messages);
    if (data?.messages) {
      chatProps.setMessages(data?.messages);
    }
  }, [data?.messages]);

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

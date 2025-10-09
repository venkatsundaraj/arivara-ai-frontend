import { MyUIMessage } from "@/server/api/routers/chat-router";
import { ChatStatus } from "ai";
import { FC, useEffect, useMemo, useRef } from "react";
import { ChatContainerContent, ChatContainerRoot } from "../ui/chat-containers";
import { MessageWrapper } from "./message-wrapper";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "../ai-elements/reasoning";
import { StreamingMessage } from "./streaming-message";

interface MessageSectionProps {
  messages: MyUIMessage[];
  status: ChatStatus;
  error?: Error;
}

const MessageSection: FC<MessageSectionProps> = ({
  messages,
  status,
  error,
}) => {
  const streamingMessageIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (status === "streaming" && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        streamingMessageIdRef.current = lastMessage.id;
      }
    } else if (status === "ready") {
      streamingMessageIdRef.current = null;
    }
  }, [status, messages]);
  const lastUserMessageIndex = useMemo(() => {
    return messages.findLastIndex((data) => data.role === "user");
  }, [messages]);
  const visibleMessages = useMemo(() => {
    return messages.filter((item) =>
      item.parts.some((val) => val.type === "text" && Boolean(val.text))
    );
  }, [messages]);
  const showLoadingMessage = useMemo(() => {
    return (
      !error &&
      (status === "submitted" ||
        (status === "streaming" &&
          !Boolean(
            messages[messages.length - 1]?.parts.some(
              (part) => part.type === "text" && Boolean(part.text)
            )
          )))
    );
  }, [error, status, messages]);
  return (
    <ChatContainerRoot className="h-[78vh] w-full overflow-y-scroll scrollbar-hide">
      <ChatContainerContent className="space-y-6 px-4 pt-6 pb-6">
        {visibleMessages.map((message, index) => {
          const isUser = message.role === "user";

          const isCurrentlyStreaming =
            message.id === streamingMessageIdRef.current &&
            status === "streaming";

          return (
            <div
              key={message.id}
              data-message-index={index}
              data-message-role={message.role}
            >
              <MessageWrapper
                id={message.id}
                metadata={message.metadata}
                disableAnimation={message.role === "assistant"}
                isUser={isUser}
                showOptions={
                  (message.role === "assistant" &&
                    (status === "ready" || status === "error")) ||
                  index !== messages.length - 1
                }
                animateLogo={
                  index === messages.length - 1 &&
                  (status === "submitted" || status === "streaming")
                }
              >
                {message.parts.map((part, i) => {
                  if (part.type === "data-tool-reasoning") {
                    return (
                      <Reasoning
                        key={i}
                        className="w-full"
                        isStreaming={part.data.status === "reasoning"}
                      >
                        <ReasoningTrigger />
                        <ReasoningContent>{part.data.text}</ReasoningContent>
                      </Reasoning>
                    );
                  }

                  if (part.type === "text") {
                    if (!part.text) return null;

                    return (
                      <div className="whitespace-pre-wrap" key={i}>
                        <StreamingMessage
                          streaming={status}
                          markdown
                          animate={
                            message.role === "assistant" && isCurrentlyStreaming
                          }
                          text={message.metadata?.userMessage || part.text}
                        />
                      </div>
                    );
                  }
                })}
              </MessageWrapper>
            </div>
          );
        })}
      </ChatContainerContent>
    </ChatContainerRoot>
  );
};

export default MessageSection;

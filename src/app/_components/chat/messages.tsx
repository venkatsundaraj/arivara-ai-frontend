import { FC, useEffect, useState } from "react";

interface MessagesProps {
  messages: { id: string; text: string; response: string }[];
  isStreaming?: boolean;
}

const Messages: FC<MessagesProps> = ({ messages, isStreaming = false }) => {
  const [displayedMessages, setDisplayedMessages] = useState<
    { id: string; text: string; response: string; displayedResponse: string }[]
  >([]);

  useEffect(() => {
    // Initialize or update messages
    setDisplayedMessages((prev) => {
      const newMessages = messages.map((msg, index) => {
        const existing = prev[index];
        if (existing && existing.id === msg.id) {
          return existing;
        }
        return { ...msg, displayedResponse: "" };
      });
      return newMessages;
    });
  }, [messages]);

  useEffect(() => {
    if (displayedMessages.length === 0) return;

    const lastMessage = displayedMessages[displayedMessages.length - 1];
    if (!lastMessage) return;

    const fullResponse = messages[displayedMessages.length - 1]?.response || "";

    if (lastMessage.displayedResponse.length < fullResponse.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          const current = updated[lastIndex];

          if (current) {
            updated[lastIndex] = {
              ...current,
              displayedResponse: fullResponse.slice(
                0,
                current.displayedResponse.length + 1
              ),
            };
          }
          return updated;
        });
      }, 5); // Adjust speed here (lower = faster)

      return () => clearTimeout(timer);
    }
  }, [displayedMessages, messages]);

  return (
    <div className="w-full flex-1 overflow-y-scroll scrollbar-hide max-h-[88vh]">
      <ul className="w-full flex flex-col items-center justify-center gap-8">
        {displayedMessages.map((item, i) => (
          <li key={i} className="flex w-full flex-col gap-6">
            <p className="self-end px-4 py-2 text-subtitle-heading rounded-lg border border-primary text-primary bg-white font-paragraph leading-normal tracking-tight">
              {item.text}
            </p>
            <p className="self-start px-6 py-2 bg-primary text-subtitle-heading rounded-lg text-white font-paragraph leading-normal tracking-normal max-w-[80%]">
              {item.displayedResponse}
              {item.displayedResponse.length < item.response.length && (
                <span className="inline-block w-1 h-4 bg-background ml-1 animate-pulse" />
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;

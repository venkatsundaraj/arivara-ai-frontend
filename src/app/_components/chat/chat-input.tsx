"use client";

import { FC, useActionState, useEffect, KeyboardEvent, useRef } from "react";
import { useFormState } from "react-dom";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "../ui/button";
import { Icons } from "../miscellaneous/icons";
import { chatInputHandler } from "@/actions/chat-input";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { nanoid } from "zod";

const initialState = { success: false, nanoid: "" };

interface PageProps {
  mode: "create" | "reply";
  chatId?: string;
}

const ChatInput: FC<PageProps> = ({ mode, chatId }) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(chatInputHandler, initialState);

  useEffect(() => {
    if (state.success) {
      if (mode === "create") {
        router.push(`/chat/${state.chatId}`);
      }
      if (mode === "reply") {
        formRef.current?.reset();
      }
    }
    if (!state.success) {
      toast.error("Please authenticate before typing something");
    }
  }, [state, router]);

  const handleKeyDown = function (e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="relative w-full flex items-center"
    >
      <Textarea
        className="w-full border-foreground/60 max-h-[90px] resize-none"
        placeholder="Type something..."
        name="chat"
        onKeyDown={handleKeyDown}
      />
      {chatId && <input type="hidden" name="chatId" value={chatId} />}
      <Button
        size="xl"
        type="submit"
        className="absolute bg-primary hover:bg-primary top-1/2 -translate-y-1/2 right-[10px] rounded-full"
      >
        <Icons.CircleArrowRight className="stroke-white w-16 scale-105" />
      </Button>
    </form>
  );
};

export default ChatInput;

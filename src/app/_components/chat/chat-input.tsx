"use client";

import { FC, useActionState, useEffect } from "react";
import { useFormState } from "react-dom";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "../ui/button";
import { Icons } from "../miscellaneous/icons";
import { chatInputHandler } from "@/actions/chat-input";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState = { success: false };

interface PageProps {}

const ChatInput: FC<PageProps> = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(chatInputHandler, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/chat/pyEexLWAR8CyLNtvI");
    }
    if (!state.success) {
      toast.error("Please authenticate before typing something");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="relative w-full flex items-center">
      <Textarea
        className="w-full border-foreground/60 min-h-[90px]"
        placeholder="Type something..."
        name="chat"
      />
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

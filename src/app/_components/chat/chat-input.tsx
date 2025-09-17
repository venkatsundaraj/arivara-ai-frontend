import { FC } from "react";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "../ui/button";
import { Icons } from "../miscellaneous/icons";

interface ChatInputProps {}

const ChatInput: FC<ChatInputProps> = ({}) => {
  return (
    <div className="relative min-w-5xl flex items-center justify-center">
      <Textarea
        className="w-full border-foreground/60 min-h-[90px]"
        placeholder="Type something..."
      />
      <Button
        size={"xl"}
        className="absolute top-1/2 cursor-pointer -translate-y-1/2 right-[10px] md:right-[20px] hover:bg-primary/90 w-12 h-12 !p-0 rounded-full"
      >
        <Icons.CircleArrowRight className="stroke-white w-16 scale-105" />
      </Button>
    </div>
  );
};

export default ChatInput;

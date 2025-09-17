import { FC } from "react";
import ChatInput from "@/app/_components/chat/chat-input";
import RecommendedTopics from "@/app/_components/chat/recommended-topics";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="h-[90%] w-full flex flex-col gap-6 items-center justify-center bg-background">
      <div className="container flex flex-col gap-6 items-center justify-center bg-background">
        <h1 className="text-secondary-heading text-center text-foreground font-semibold leading-normal tracking-wide font-heading mb-8">
          What's on your mind today?
        </h1>
        <ChatInput />
        <RecommendedTopics />
      </div>
    </section>
  );
};

export default page;

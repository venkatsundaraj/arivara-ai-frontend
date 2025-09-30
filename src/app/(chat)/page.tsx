import ChatInput from "@/app/_components/chat/chat-input";
import RecommendedTopics from "@/app/_components/chat/recommended-topics";
import { Toaster } from "../_components/miscellaneous/sonner";
import { api } from "@/trpc/server";
import ChatInputTrpc from "@/app/_components/chat/chat-input-trpc";

interface pageProps {}

const page = async ({}: pageProps) => {
  const data = await api.post.hello({ text: "venkat" });

  console.log(data);
  return (
    <>
      <section className="h-[90%] w-full flex flex-col gap-6 items-center justify-center bg-background">
        <div className="container flex flex-col gap-6 items-center justify-center bg-background">
          <h1 className="text-secondary-heading text-center text-foreground font-semibold leading-normal tracking-wide font-heading mb-8">
            What's on your mind today?
          </h1>
          <ChatInputTrpc mode="create" />
          <RecommendedTopics />
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default page;

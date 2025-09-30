import ChatInput from "@/app/_components/chat/chat-input";
import ChatInputTrpc from "@/app/_components/chat/chat-input-trpc";
import ChatMainPage from "@/app/_components/chat/chat-main-page";
import Messages from "@/app/_components/chat/messages";
import { api } from "@/trpc/server";

interface pageProps {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

const page = async ({ params }: pageProps) => {
  const param = await params;

  const isEditMode = Boolean(param.id);

  return isEditMode ? (
    <section className="w-full h-full flex items-center justify-center ">
      <div className="container h-full flex-col flex items-center justify-center py-8">
        {/* <Messages messages={messages} /> */}
        <ChatInputTrpc mode="reply" chatId={param.id} />
      </div>
    </section>
  ) : null;
};

export default page;

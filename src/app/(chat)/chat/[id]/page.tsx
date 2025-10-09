import ChatInput from "@/app/_components/chat/chat-input";
import { ChatInputLexical } from "@/app/_components/chat/chat-input-lexical";
import ChatInputTrpc from "@/app/_components/chat/chat-input-trpc";
import ChatInputWrap from "@/app/_components/chat/chat-input-wrap";
import ChatMainPage from "@/app/_components/chat/chat-main-page";
import Messages from "@/app/_components/chat/messages";
import { api } from "@/trpc/server";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

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
      <div className="container h-full flex-col flex items-center justify-between py-8">
        <ChatInputWrap />
      </div>
    </section>
  ) : null;
};

export default page;

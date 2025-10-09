"use client";
import { useChatContext } from "@/hooks/use-chat";
import { MultipleEditorPlugin } from "@/lib/lexical-plugins/multiple-editor-plugin";
import { PlaceholderPlugin } from "@/lib/lexical-plugins/placeholder-plugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import {
  $createParagraphNode,
  $getRoot,
  COMMAND_PRIORITY_HIGH,
  KEY_ENTER_COMMAND,
} from "lexical";
import { useParams } from "next/navigation";
import { FC, useCallback, useEffect } from "react";
import { Icons } from "../miscellaneous/icons";
import { Button } from "../ui/button";
import MessageSection from "./message-section";
import { useAccount } from "../providers/account-provider";

interface ChatInputBoxProps {
  onSubmit: (text: string) => void;
}

const ChatInputBox: FC<ChatInputBoxProps> = ({ onSubmit }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeCommand = editor?.registerCommand(
      KEY_ENTER_COMMAND,
      (event: KeyboardEvent | null) => {
        if (event && !event.shiftKey) {
          event.preventDefault();

          const text = editor.getEditorState().read(() => {
            const root = $getRoot();
            return root.getTextContent().trim();
          });
          console.log(text);
          onSubmit(text);

          editor.update(() => {
            const root = $getRoot();

            root.clear();
            const paragraph = $createParagraphNode();
            root.append(paragraph);
          });
        }

        return true;
      },
      COMMAND_PRIORITY_HIGH
    );

    return () => {
      removeCommand();
    };
  }, [editor, onSubmit]);
  const handlePaste = () => {};

  const handleSubmit = () => {
    const text = editor.read(() => $getRoot().getTextContent().trim());
    console.log(text);

    return editor.update(() => {
      const root = $getRoot();
      root.clear();
      root.append($createParagraphNode());
    });
  };
  return (
    <div className="flex w-full gap-6 items-center justify-center flex-col relative h-[90px] overflow-y-scroll  justify-self-end">
      <PlainTextPlugin
        contentEditable={
          <ContentEditable
            className="w-full h-full ring-2 border border-primary ring-accent rounded-md p-2"
            onPaste={handlePaste}
            autoFocus
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <PlaceholderPlugin placeholder="Write Something..." />
      <HistoryPlugin />
      <MultipleEditorPlugin id="app-sidebar" />
      <Button
        onClick={handleSubmit}
        size="xl"
        type="submit"
        className="absolute bg-primary hover:bg-primary top-1/2 -translate-y-1/2 right-[10px] rounded-full"
      >
        <Icons.CircleArrowRight className="stroke-white w-16 scale-105" />
      </Button>
    </div>
  );
};

export { ChatInputBox };

export const ChatInputLexical = function () {
  const { sendMessage, startNewMessage, messages, status, ...res } =
    useChatContext();

  const params = useParams<{ id: string }>();

  const handleSubmit = useCallback(
    async function (text: string) {
      if (!text.trim()) return;
      console.log(messages, "messages from the client");
      startNewMessage(text);
    },
    [messages]
  );

  useEffect(() => {
    // console.log(res.messages, "frontend");
  }, [res]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-end">
      {/* <ChatInputTrpc mode="reply" chatId={param.id} /> */}
      {messages.length && params.id ? (
        <MessageSection messages={messages} status={status} />
      ) : null}
      <ChatInputBox onSubmit={handleSubmit} />
    </div>
  );
};

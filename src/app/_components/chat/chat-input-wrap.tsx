"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { FC } from "react";
import { ChatInputLexical } from "./chat-input-lexical";
import { EditorProvider } from "@/hooks/use-editors";
import { ChatProvider } from "@/hooks/use-chat";
import { ThemeProvider } from "@/hooks/use-theme";

interface ChatInputWrapProps {}

const initialConfig = {
  namespace: "chat-input",
  theme: {
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
    },
  },
  onError: (err: Error) => {
    console.log(err);
  },
  nodes: [],
};

const ChatInputWrap: FC<ChatInputWrapProps> = ({}) => {
  return (
    <EditorProvider>
      <ChatProvider>
        <ThemeProvider>
          <LexicalComposer initialConfig={initialConfig}>
            <ChatInputLexical />
          </LexicalComposer>
        </ThemeProvider>
      </ChatProvider>
    </EditorProvider>
  );
};

export default ChatInputWrap;

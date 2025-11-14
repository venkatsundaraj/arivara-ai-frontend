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
import { FC, useCallback, useEffect, useState } from "react";
import { Icons } from "../miscellaneous/icons";
import { Button } from "../ui/button";
import MessageSection from "./message-section";
import { useAccount } from "../providers/account-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/app/_components/ui/dropdown-menu";

interface ChatSettings {
  model: string;
  temperature?: number;
  maxTokens?: number;
  streaming?: boolean;
}

interface ChatInputBoxProps {
  onSubmit: (text: string) => void;
}

const AVAILABLE_MODELS = [
  { id: "gpt-4", name: "GPT-4", description: "Most capable" },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    description: "Powerful reasoning",
  },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", description: "Balanced" },
];

const TEMPERATURE_OPTIONS = [
  { value: 0, label: "Precise (0)" },
  { value: 0.5, label: "Balanced (0.5)" },
  { value: 0.7, label: "Creative (0.7)" },
  { value: 1, label: "Very Creative (1)" },
];

const MAX_TOKENS_OPTIONS = [
  { value: 512, label: "512 tokens" },
  { value: 1024, label: "1024 tokens" },
  { value: 2048, label: "2048 tokens" },
  { value: 4096, label: "4096 tokens" },
];

const ChatInputBox: FC<ChatInputBoxProps> = ({ onSubmit }) => {
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    model: "",
    temperature: 0,
    maxTokens: 512,
    streaming: true,
  });
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

  const onSettingsChange = function (item: ChatSettings) {
    console.log(item);
  };

  const selectedModel = AVAILABLE_MODELS.find(
    (m) => m.id === chatSettings.model
  );
  return (
    <div className="flex w-full gap-6 items-center justify-center flex-col relative min-h-[150px] overflow-x-hidden overflow-y-hidden  justify-self-end ">
      <div className="flex flex-wrap gap-2 w-full items-center px-2 py-1 rounded-md absolute top-[60%] left-[20px]">
        {/* Model Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 !bg-white">
              <Icons.Sparkles className="w-4 h-4" />
              {selectedModel?.name || "Select Model"}
              <Icons.ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Choose Model</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {AVAILABLE_MODELS.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() =>
                  onSettingsChange({ ...chatSettings, model: model.id })
                }
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-2">
                  {chatSettings?.model === model.id && (
                    <Icons.Check className="w-4 h-4" />
                  )}
                  <span className="font-medium">{model.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {model.description}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Temperature Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 !bg-white">
              <Icons.Thermometer className="w-4 h-4" />
              Temp: {chatSettings?.temperature ?? 0.7}
              <Icons.ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Temperature</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {TEMPERATURE_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() =>
                  onSettingsChange({
                    ...chatSettings,
                    temperature: option.value,
                  })
                }
              >
                {chatSettings.temperature === option.value && (
                  <Icons.Check className="w-4 h-4 mr-2" />
                )}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Max Tokens Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 !bg-white">
              <Icons.FileText className="w-4 h-4" />
              {chatSettings.maxTokens || 2048}
              <Icons.ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Max Tokens</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {MAX_TOKENS_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() =>
                  onSettingsChange({ ...chatSettings, maxTokens: option.value })
                }
              >
                {chatSettings.maxTokens === option.value && (
                  <Icons.Check className="w-4 h-4 mr-2" />
                )}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Streaming Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 !bg-white">
              <Icons.Settings className="w-4 h-4" />
              Options
              <Icons.ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={chatSettings.streaming ?? true}
              onCheckedChange={(checked) =>
                onSettingsChange({ ...chatSettings, streaming: checked })
              }
            >
              Streaming Response
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <PlainTextPlugin
        contentEditable={
          <ContentEditable
            className="w-full h-[150px] overflow-y-scroll ring-2 border border-primary ring-accent rounded-md p-2 focus-within:outline-0"
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
        className="absolute bg-primary hover:bg-primary top-[73%] md:top-[64%] -translate-y-1/2 right-[10px] rounded-full"
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

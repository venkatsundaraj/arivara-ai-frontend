"use client";

import {
  FC,
  useActionState,
  useEffect,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { useFormState } from "react-dom";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { Icons } from "@/app/_components/miscellaneous/icons";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import {
  inputValidatorSchema,
  InputValidatorType,
} from "@/lib/validation/input-validator";
import z from "zod";
import { toast } from "sonner";
import Messages from "./messages";

interface PageProps {
  mode: "create" | "reply";
  chatId?: string;
}

const ChatInputTrpc: FC<PageProps> = ({ mode, chatId }) => {
  const [messages, setMessages] = useState<
    { id: string; text: string; response: string }[]
  >([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    control,
    setError,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<InputValidatorType>({
    resolver: zodResolver(inputValidatorSchema),
    defaultValues: {
      text: "",
    },
  });
  const router = useRouter();
  const utils = api.useContext();

  const createId = api.chat.createChat.useMutation({
    onSuccess: (data) => {
      if (mode === "create") {
        toast.success("New chat has been created");
        // console.log(data, "create");
        if (data.chatId) {
          router.push(`/chat/${data.chatId}`);
        }
      }
      if (mode === "reply") {
        // console.log(data, "reply");
        utils.chat.getMessages.invalidate();
        // console.log(data);
        setMessages((prev) => {
          return [...prev, { ...data.messages }];
        });

        // Trigger streaming animation
        setIsStreaming(true);
        // Reset streaming state after animation completes
        setTimeout(() => {
          setIsStreaming(false);
        }, data.messages.response.length * 20 + 100);
      }
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleKeyDown = async function (e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const value = getValues();

      await createId.mutateAsync({ ...value, chatId: chatId });
    }
  };

  const submitHandler = async function (formData: InputValidatorType) {
    try {
      await createId.mutateAsync({ ...formData, chatId: chatId });
    } catch (err) {
      console.log(err);
      if (err instanceof z.ZodError) {
        setError("root", { message: err.message });
      }
    }
  };

  return (
    <>
      {<Messages messages={messages} isStreaming={isStreaming} />}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative w-full flex items-center"
      >
        <Textarea
          className="w-full border-foreground/60 max-h-[90px] resize-none"
          placeholder="Type something..."
          {...register("text")}
          onKeyDown={handleKeyDown}
        />
        {errors.text && <p className="text-red-500">{errors.text.message}</p>}
        <Button
          size="xl"
          type="submit"
          className="absolute bg-primary hover:bg-primary top-1/2 -translate-y-1/2 right-[10px] rounded-full"
        >
          <Icons.CircleArrowRight className="stroke-white w-16 scale-105" />
        </Button>
      </form>
    </>
  );
};

export default ChatInputTrpc;

"use server";

import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
export async function chatInputHandler(prevState: any, data: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { success: false };
  }

  const message = data.get("chat");
  const chatId = data.get("chatId");

  if (!chatId) {
    return { success: true, chatId: nanoid() };
  }

  //id creation

  return { success: true, messages: [] };
}

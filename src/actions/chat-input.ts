"use server";

import { auth } from "@/lib/auth";

export async function chatInputHandler(prevState: any, data: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { success: false };
  }

  const message = data.get("chat");

  //id creation

  return { success: true };
}

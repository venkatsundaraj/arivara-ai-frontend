import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { MyUIMessage } from "@/server/api/routers/chat-router";

const messageSchema = z.object({
  message: z.any(),
  id: z.string(),
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { data } = messageSchema.safeParse(body);
    if (!data) {
      throw new Error("Something went wrong here");
    }

    const { id, message } = data as { id: string; message: MyUIMessage };
  } catch (err) {}
}

"use server";

import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
export async function chatInputHandler(prevState: any, data: FormData) {
  const session = await getCurrentUser();
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

const getIp = async function () {
  const ip = (await headers()).get("x-forwarded-for");

  const ipOne = (await headers()).get("x-real-ip");

  if (ip) {
    return ip.split(",")[0].trim();
  }

  if (ipOne) {
    return ipOne;
  }
  return null;
};

// {
//   "123.43.2":{limit:"", expiresAt:""},
//   "123.43.2":{limit:"", expiresAt:""},
// }

const trackers: Record<string, { count: number; expiresAt: number }> = {};

const rateLimit = async function (limit: number, time: number) {
  const ip = await getIp();

  if (!ip) {
    throw new Error("Couldnt find the IP");
  }

  const tracker = trackers[ip] || { count: 0, expiresAt: 0 };

  if (!trackers[ip]) {
    console.log(true);
    trackers[ip] = { count: 0, expiresAt: 0 };
  }

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + time;
  }

  tracker.count++;

  if (limit < tracker.count) {
    throw new Error("you have achieved the limit");
  }
};

export const rateLimitHandler = async function () {
  // console.log(true);
  try {
    const res = rateLimit(1, 2000);
  } catch (err) {
    console.log(err, "err");
  }
};

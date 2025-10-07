import { redis } from "@/lib/redis";
import { getCurrentUser } from "@/lib/session";

import { Account, User } from "@/server/db/schema";

export const getAccount = async function (email: string) {
  const account = await redis.json.get<User>(`account-active:${email}`);

  let payload = account;

  if (!account?.id) {
    const session = await getCurrentUser();

    payload = {
      ...session?.user,
    } as User;
    await redis.json.set(`active-account:${email}`, "$", payload);
  }
  return payload;
};

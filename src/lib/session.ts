import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getCurrentUser = async function () {
  try {
    const data = await auth.api.getSession({
      headers: await headers(),
    });

    if (!data) {
      throw new Error("you should authenticate");
    }

    return data;
  } catch (err) {
    console.log(err);
  }
};

import { auth } from "@/lib/auth";

export const getCurrentUser = async function () {
  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new Error("unauthorized");
    }

    return session.user;
  } catch (err) {
    console.log(err);
  }
};

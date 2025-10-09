import { getCurrentUser } from "@/lib/session";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAccount: privateProcedure.query(async ({ ctx }) => {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("unauthorized");
    }
    if (!user.user || user.user.email) return;
    return user.user.email;
  }),
});

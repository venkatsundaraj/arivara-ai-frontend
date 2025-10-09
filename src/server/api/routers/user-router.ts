import { getCurrentUser } from "@/lib/session";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAccount: privateProcedure.query(async ({ ctx }) => {
    const user = await getCurrentUser();

    if (!user) {
      return;
    }
    if (!user.user) return;
    return user.user;
  }),
});

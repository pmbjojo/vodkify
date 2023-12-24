import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    if (!ctx?.session?.user.id) return null;
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
});

import { z } from "zod";

export const inputValidatorSchema = z.object({
  text: z.string().min(1),
  chatId: z.string().optional(),
});

export type InputValidatorType = z.infer<typeof inputValidatorSchema>;

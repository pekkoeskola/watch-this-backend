import z from "zod";

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const MovieSchema = z.object({
  title: z.string(),
  overview: z.string()
});

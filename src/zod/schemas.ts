import z from "zod";

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const cachedUserSchema = z.object({
  username: z.string(),
  id: z.number(),
});

export const MovieSchema = z.object({
  title: z.string(),
  overview: z.string(),
});

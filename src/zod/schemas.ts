import z from "zod";

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const cachedUserSchema = z.object({
  username: z.string(),
  id: z.number(),
});

export const MovieDetailsSchema = z.object({
  title: z.string(),
  overview: z.string().optional(),
  posterURL: z.string().optional()
});

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string().optional(),
  posterURL: z.string().optional()
});

export const coerceToNumber = (value: string) => z.coerce.number().parse(value);

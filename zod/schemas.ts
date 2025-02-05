import z = require("zod");

export const NewUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});
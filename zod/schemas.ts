import z = require("zod");

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
});
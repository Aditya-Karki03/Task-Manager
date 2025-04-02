import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().refine((pass) => pass.length > 0 && pass.length < 20, {
    message: "Password must be atleast 8 letters",
  }),
});
export type signUpDataType = z.infer<typeof signupSchema>;
export default signupSchema;

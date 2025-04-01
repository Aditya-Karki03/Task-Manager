import { z } from "zod";

const otpSchema = z.object({
  otp: z.string().refine((otpVal) => otpVal.length == 6, {
    message: "OTP must be 6 digits",
  }),
});
export type otpType = z.infer<typeof otpSchema>;
export default otpSchema;

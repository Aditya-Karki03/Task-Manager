import { z } from "zod";
import { IRegistrationValidator } from "../interface/IUser";

export function registrationDataValidator(userInfo: IRegistrationValidator) {
  const schema = z.object({
    fName: z.string().refine((name) => name.length > 1 && name.length < 30, {
      message: "First Name must be within 30 letters",
    }),
    lName: z.string().refine((name) => name.length > 0 && name.length < 40, {
      message: "Last Name should be within 30 letters",
    }),
    email: z.string().email({
      message: "Please type a valid email",
    }),
  });
  const { success, error, data } = schema.safeParse(userInfo);
  return {
    success,
    error,
    data,
  };
}

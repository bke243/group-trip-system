import { z } from "zod";

export const UserRegistrationSchema = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    birthDate: z.string().nonempty(),
    email: z.string().email(),
    passWord: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
  })
  .superRefine((data, ctx) => {
    if (data.passWord !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Password Should match",
      });
    }
  });

export type UserRegistrationModel = z.infer<typeof UserRegistrationSchema>;

export const UserLoginSchema = z.object({
  email: z.string().email(),
  passWord: z.string().nonempty(),
});

export type UserLoginModel = z.infer<typeof UserLoginSchema>;

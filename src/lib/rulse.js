import { z } from "zod";

// This is use for register validation only
export const RegisterFromSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(1, { message: "Password not be  Empty." })
      .regex(/[A-Z]/, {
        message: "Password must contain one uppercase.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain one lowercase.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain one number.",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password field do not match.",
        path: ["confirmPassword"],
      });
    }
  });

// Thsi is use for login validation only
export const LoginFromSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
});

import * as z from 'zod';

export const loginSchema = z.object({
    staffId: z
        .string(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { 
        message: 'Password must contain at least one special character' 
    }),
});

export type LoginInput = z.infer<typeof loginSchema>;
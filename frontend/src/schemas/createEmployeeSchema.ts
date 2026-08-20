import { z } from 'zod';

import {
    passwordSchema,
    pinCodeSchema,
} from './credentialsSchema';

export const createEmployeeSchema = z
    .object({
        name: z
            .string()
            .min(2, 'Name must contain at least 2 characters'),

        email: z
            .string()
            .email('Invalid email address'),

        role: z.enum([
            'ADMIN',
            'CLEANER',
            'REPAIRMAN',
        ]),

        password: z.string().optional(),
        confirmPassword: z.string().optional(),

        pinCode: z.string().optional(),
        confirmPinCode: z.string().optional(),
    })
    .superRefine((data, ctx) => {

        if (data.role === 'ADMIN') {

            if (!data.password) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['password'],
                    message: 'Password is required',
                });
            } else {
                const result = passwordSchema.safeParse(
                    data.password
                );

                if (!result.success) {
                    ctx.addIssue({
                        code: 'custom',
                        path: ['password'],
                        message: result.error.issues[0].message,
                    });
                }
            }

            if (!data.confirmPassword) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['confirmPassword'],
                    message: 'Please confirm your password',
                });
            } else if (
                data.password !== data.confirmPassword
            ) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['confirmPassword'],
                    message: 'Passwords do not match',
                });
            }

            return;
        }

        if (!data.pinCode) {
            ctx.addIssue({
                code: 'custom',
                path: ['pinCode'],
                message: 'PIN is required',
            });
        } else {
            const result = pinCodeSchema.safeParse(
                data.pinCode
            );

            if (!result.success) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['pinCode'],
                    message: result.error.issues[0].message,
                });
            }
        }

        if (!data.confirmPinCode) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPinCode'],
                message: 'Please confirm your PIN',
            });
        } else if (
            data.pinCode !== data.confirmPinCode
        ) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPinCode'],
                message: 'PIN codes do not match',
            });
        }
    });

export type CreateEmployeeFormValues =
    z.infer<typeof createEmployeeSchema>;
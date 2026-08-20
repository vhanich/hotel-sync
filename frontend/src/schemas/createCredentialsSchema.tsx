import { z } from 'zod';

import type { StaffRole } from '../types/staff.types';

import {
    passwordSchema,
    pinCodeSchema,
} from './credentialsSchema';

export const createChangeCredentialsSchema = (
    role: StaffRole
) =>
    z.object({
        password: role === 'ADMIN'
            ? passwordSchema
            : z.string().optional(),

        confirmPassword: role === 'ADMIN'
            ? z.string()
            : z.string().optional(),

        pinCode: role !== 'ADMIN'
            ? pinCodeSchema
            : z.string().optional(),

        confirmPinCode: role !== 'ADMIN'
            ? z.string()
            : z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (role === 'ADMIN') {
            if (data.password !== data.confirmPassword) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['confirmPassword'],
                    message: 'Passwords do not match',
                });
            }

            return;
        }

        if (data.pinCode !== data.confirmPinCode) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPinCode'],
                message: 'PIN codes do not match',
            });
        }
    });

export type ChangeCredentialsFormValues = z.infer<
    ReturnType<typeof createChangeCredentialsSchema>
>;
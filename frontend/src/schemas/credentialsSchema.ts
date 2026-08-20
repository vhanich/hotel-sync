import { z } from 'zod';

export const passwordSchema = z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .regex(
        /[A-Z]/,
        'Password must contain at least one uppercase letter'
    )
    .regex(
        /[a-z]/,
        'Password must contain at least one lowercase letter'
    )
    .regex(
        /[0-9]/,
        'Password must contain at least one number'
    )
    .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
    );

export const pinCodeSchema = z
    .string()
    .regex(
        /^\d{4}$/,
        'PIN must contain exactly 4 digits'
    );

export const passwordCredentialsSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine(
        data => data.password === data.confirmPassword,
        {
            path: ['confirmPassword'],
            message: 'Passwords do not match',
        }
    );

export const pinCredentialsSchema = z
    .object({
        pinCode: pinCodeSchema,
        confirmPinCode: z.string(),
    })
    .refine(
        data => data.pinCode === data.confirmPinCode,
        {
            path: ['confirmPinCode'],
            message: 'PIN codes do not match',
        }
    );
import { z } from 'zod';

import type { StaffRole } from '../types/staff.types';

export const createEditEmployeeSchema = (
    initialRole: StaffRole
) => {
    return z
        .object({
            name: z
                .string()
                .min(2, 'Name must contain at least 2 characters.'),
            email: z
                .string() 
                .email('Invalid email address'),  
            role: z.enum([
                'ADMIN',
                'CLEANER',
                'REPAIRMAN',
            ]),

            status: z.enum([
                'ACTIVE',
                'INACTIVE',
                'TERMINATED',
            ]),
            availability: z.enum([
                'AVAILABLE',
                'UNAVAILABLE',
                'VACATION',
                'SICK_LEAVE',
                'DAY_OFF',
            ]),

            password:
                z.string().optional(),

            confirmPassword:
                z.string().optional(),

            pinCode:
                z.string().optional(),

            confirmPinCode:
                z.string().optional(),
        })
        .superRefine((data, ctx) => {
            const roleChanged =
                data.role !== initialRole;

            const authenticationMethodChanged =
                (
                    initialRole === 'ADMIN' &&
                    data.role !== 'ADMIN'
                ) ||
                (
                    initialRole !== 'ADMIN' &&
                    data.role === 'ADMIN'
                );
                
            const shouldShowCredentials =
                roleChanged &&
                authenticationMethodChanged;

            if (!shouldShowCredentials) {
                return;
            }  
            
            if (data.role === 'ADMIN') {
                if (!data.password) {
                    ctx.addIssue({
                        code: 'custom',
                        path: ['password'],
                        message: 'Password is required',
                    });
                } else {
                   if (data.password.length < 8) {
                        ctx.addIssue({
                            code: 'custom',
                            path: ['password'],
                            message:
                                'Password must contain at least 8 characters',
                        });
                    } 

                    if (!/[A-Z]/.test(data.password)) {
                        ctx.addIssue({
                            code: 'custom',
                            path: ['password'],
                            message:
                                'Password must contain at least one uppercase letter',
                        });
                    }

                    if (!/[a-z]/.test(data.password)) {
                        ctx.addIssue({
                            code: 'custom',
                            path: ['password'],
                            message:
                                'Password must contain at least one lowercase letter',
                        });
                    }

                    if (!/[0-9]/.test(data.password)) {
                        ctx.addIssue({
                            code: 'custom',
                            path: ['password'],
                            message:
                                'Password must contain at least one number',
                        });
                    }

                    if (!/[^A-Za-z0-9]/.test(data.password)) {
                        ctx.addIssue({
                            code: 'custom',
                            path: ['password'],
                            message:
                                'Password must contain at least one special character',
                        });
                    }
                }


                if (!data.confirmPassword) {
                    ctx.addIssue({
                        code: 'custom',
                        path: ['confirmPassword'],
                        message:
                            'Please confirm your password',
                    });
                } else if (
                    data.password !== data.confirmPassword
                ) {
                    ctx.addIssue({
                        code: 'custom',
                        path: ['confirmPassword'],
                        message:
                            'Passwords do not match',
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
            } else if (!/^\d{4}$/.test(data.pinCode)) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['pinCode'],
                    message:
                        'PIN must contain exactly 4 digits',
                });
            }

            if (!data.confirmPinCode) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['confirmPinCode'],
                    message:
                        'Please confirm your PIN',
                });
            } else if (
                data.pinCode !== data.confirmPinCode
            ) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['confirmPinCode'],
                    message:
                        'PIN codes do not match',
                });
            }
        });
};

export type EditEmployeeFormValues =
    z.infer<
        ReturnType<typeof createEditEmployeeSchema>
    >;
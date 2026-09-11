import { z } from 'zod';

export const reservationIdParamsSchema = z.object({
    id: z.string().uuid(),
});
export type ReservationIdParams = z.infer<typeof reservationIdParamsSchema>;


export const createReservationSchema = z.object({
    roomId: z.string().uuid(),
    guest: z.object({
        fullName: z.string().min(4).max(30),
        phoneNumber: z.string().min(10).max(15),
        email: z
                .string()
                .trim()
                .toLowerCase()
                .email(),
    }),
    checkInDate: z.coerce.date(),
    checkOutDate: z.coerce.date(),
    guestCount: z.number().int().min(1),
})
.superRefine((data, ctx) => {
    if (data.checkInDate >= data.checkOutDate) {
        ctx.addIssue({
            code: 'custom',
            path: ['checkOutDate'],
            message: 'Check-out date must be after check-in date',
        });
    }
});
export type CreateReservationInput = z.infer<typeof createReservationSchema>;

export const getReservationsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10),
    
    search: z.string().trim().optional(),    
        
    reservationStatus: z.enum([
        'PENDING',
        'CONFIRMED',
        'CHECKED_IN',
        'CHECKED_OUT',
        'CANCELLED',
    ]).optional(),

    roomId: z.string().uuid().optional(),

    checkInDate: z.coerce.date().optional(),
    checkOutDate: z.coerce.date().optional(),
});
export type GetReservationsQuery = z.infer<typeof getReservationsQuerySchema>;

export const updateReservationSchema = z.object({
    roomId: z.string().uuid().optional(),

    checkInDate: z.coerce.date().optional(),
    checkOutDate: z.coerce.date().optional(),

    guestCount: z.number().int().min(1).optional(),

    guest: z.object({
        fullName: z.string().min(4).max(30),
        phoneNumber: z.string().min(10).max(15),
        email: z
                .string()
                .trim()
                .toLowerCase()
                .email(),
    }).optional(),
})
.superRefine((data, ctx) => {
    if (
        data.checkInDate &&
        data.checkOutDate &&
        data.checkInDate >= data.checkOutDate
    ) {
        ctx.addIssue({
            code: 'custom', 
            path: ['checkOutDate'],
            message: 'Check-out date must be after check-in date',
        });
    }   
});
export type UpdateReservationInput = z.infer<typeof updateReservationSchema>;

export const reservationStatusSchema = z.enum([
    'PENDING',
    'CONFIRMED',
    'CANCELLED',
    'CHECKED_IN',
    'CHECKED_OUT'
]);
export type ReservationStatus = z.infer<typeof reservationStatusSchema>;


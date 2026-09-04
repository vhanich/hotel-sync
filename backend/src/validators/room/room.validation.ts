import { z } from 'zod';

const roomTypeSchema = z.enum([
    'STANDARD',
    'SUPERIOR',
    'DELUXE',
    'PREMIUM',
    'LUXURY',
]);

const roomOccupancySchema = z.enum([
    'VACANT',
    'OCCUPIED'
]);

const roomHousekeepingStatusSchema = z.enum([
    'CLEAN',
    'DIRTY',
    'CLEANING',
    'INSPECTION_REQUIRED'
]);

const roomMaintenanceStatusSchema = z.enum([
    'OPERATIONAL',
    'UNDER_MAINTENANCE',
    'OUT_OF_ORDER'
]);

export const roomIdParamsSchema = z.object({
    id: z.string().uuid(),
});

export const createRoomSchema = z.object({
    number: z.string().trim().min(1, 'Room number is required'),
    floor: z.number().int('Floor must be an integer').min(0, 'Floor cannot be negative'),
    type: roomTypeSchema,
    capacity: z.number().int('Capacity must be an integer').min(1, 'Capacity must be at least 1'),
});

export const updateRoomSchema = z.object({
    number: z.string().trim().min(1, 'Room number is required').optional(),
    floor: z.number().int('Floor must be an integer').min(0, 'Floor cannot be negative').optional(),
    type: roomTypeSchema.optional(),
    capacity: z.number().int('Capacity must be an integer').min(1, 'Capacity must be at least 1').optional(),
})
.refine(
    data => Object.keys(data).length > 0,
    {
      message: 'At least one field must be provided',
    }
);

export const updateOccupancySchema = z.object({
    occupancyStatus: roomOccupancySchema,
});

export const updateHousekeepingSchema = z.object({
    housekeepingStatus: roomHousekeepingStatusSchema,
});

export const updateMaintenanceSchema = z.object({
    maintenanceStatus: roomMaintenanceStatusSchema,
});

export const getRoomsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10),

    search: z.string().trim().optional(),

    type: roomTypeSchema.optional(),

    floor: z.coerce
        .number()
        .int()
        .min(0)
        .optional(),

    occupancyStatus: roomOccupancySchema.optional(),

    housekeepingStatus: roomHousekeepingStatusSchema.optional(),

    maintenanceStatus: roomMaintenanceStatusSchema.optional(),

    isActive: z.coerce.boolean().optional(),
});

export type RoomType = z.infer<typeof roomTypeSchema>;

export type OccupancyStatus = z.infer<typeof roomOccupancySchema>;

export type HousekeepingStatus = z.infer<
  typeof roomHousekeepingStatusSchema
>;

export type MaintenanceStatus = z.infer<
  typeof roomMaintenanceStatusSchema
>;

export type RoomIdParams = z.infer<
  typeof roomIdParamsSchema
>;

export type CreateRoomInput = z.infer<
  typeof createRoomSchema
>;

export type UpdateRoomInput = z.infer<
  typeof updateRoomSchema
>;

export type UpdateOccupancyInput = z.infer<
  typeof updateOccupancySchema
>;

export type UpdateHousekeepingInput = z.infer<
  typeof updateHousekeepingSchema
>;

export type UpdateMaintenanceInput = z.infer<
  typeof updateMaintenanceSchema
>;

export type GetRoomsQuery = z.infer<
  typeof getRoomsQuerySchema
>;


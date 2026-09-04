import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import type { Prisma, PrismaClient, StaffRole } from '@prisma/client';

import { prepareCredentialsUpdate } from '../services/credentialsUpdate.service';

export const getAllStaff = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        
        const page = Number(req.query.page) || 0;
        const limit = Number(req.query.limit) || 10;

        const search = req.query.search as string | undefined;
        const roles = req.query.roles as string | undefined;

        const roleList = roles ? roles.split(',') : [];

        const where: Prisma.StaffWhereInput = {};
        if (search) {
            where.name = { 
                contains: search,
                mode: 'insensitive'
            }
        }

        if (roleList.length > 0) {
            where.role = { in: roleList as StaffRole[] };
        }   

        const [ staff, total ] = await Promise.all([
            prisma.staff.findMany({
                where,
                select: {
                    id: true,
                    staffId: true,
                    name: true,
                    role: true,
                    email: true,
                    availability: true,
                    status: true
                },
                orderBy: [
                    { status: 'asc' },
                    { availability: 'asc' },
                    { name: 'asc' }
                ],
                skip: page * limit,
                take: limit
            }),
            prisma.staff.count({ where })
        ]);


        return res.json({
            data: staff,
            total
        });
    } catch (error: any) {
        console.error('Error fetching staff members:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const createStaff = async (req: Request, res: Response) => {
    try {
        const { name, email, role, password, pinCode } = req.body;

        const existingStaff = await prisma.staff.findUnique({ where: { email } });
        if (existingStaff) {
            return res.status(400).json({ error: 'Staff member with this email already exists' });
        }

        const staffData: any = {
            name,
            email,
            role,
            staffId: await generateStaffId(prisma),
        };

        if (role === 'ADMIN' ) {
            if (!password) {
                return res.status(400).json({ error: 'Password is required for ADMIN role' });
            }
            staffData.hashedPassword = await bcrypt.hash(password, 10);
        } else if (role === 'CLEANER' || role === 'REPAIRMAN') {
            if (!pinCode) {
                return res.status(400).json({ error: 'Pin code is required for CLEANER or REPAIRMAN role' });
            }
            staffData.hashedPinCode = await bcrypt.hash(pinCode, 10);
        } else {
            return res.status(400).json({ error: 'Invalid role specified' });
        }

        const newStaff = await prisma.staff.create({ data: staffData });

        const { hashedPassword, hashedPinCode, ...staffWithoutSensitiveInfo } = newStaff;

        return res.status(201).json({
            message: 'Staff member created successfully',
            data: staffWithoutSensitiveInfo,
        });
    } catch (error: any) {
        console.error('Error creating staff member:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateStaff = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, role, status, availability, password, pinCode } = req.body;

        const existingStaff = await prisma.staff.findUnique({ where: { id: String(id) } });
        if (!existingStaff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }

        const updatedData: Record<string, unknown> = {};

        if (name !== undefined) updatedData.name = name;
        if (email !== undefined) updatedData.email = email;
        if (status !== undefined) updatedData.status = status;
        if (availability !== undefined) updatedData.availability = availability;

        const roleChanged = role !== undefined && role !== existingStaff.role;
        if (roleChanged) {
            const credentials = await prepareCredentialsUpdate({
                role,
                password,
                pinCode
            });

            updatedData.role = role;
            Object.assign(updatedData, credentials);
        }

        const updatedStaff = await prisma.staff.update({
            where: { id: String(id) },
            data: updatedData,
        });

        const { hashedPassword, hashedPinCode, ...staffWithoutSensitiveInfo } = updatedStaff;
        return res.status(200).json({
            message: 'Staff member updated successfully',
            data: staffWithoutSensitiveInfo,
        });
    } catch (error: any) {
        console.error('Error updating staff member:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const changeCredentials = async (
    req: Request, res: Response
) => {
    try {
        const { id } = req.params;

        const {
            password,
            pinCode
        } = req.body;

        console.log('password', password);
        console.log('pinCode', pinCode);
        

        const staff = await prisma.staff.findUnique({
            where: {
                id: String(id)
            }
        });

        console.log(staff);
        

        if (!staff) {
            return res.status(404).json({
                error: 'Staff member not found'
            });
        }

        const credentials = await prepareCredentialsUpdate({
            role: staff.role,
            password,
            pinCode
        });

        await prisma.staff.update({
            where: {
                id: String(id)
            },
            data: credentials
        });

        return res.status(200).json({
            message: 'Credentials updated successfully'
        });
    } catch (err: any) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const generateStaffId = async (
    prisma: PrismaClient
): Promise<string> => {
    const result = await prisma.$queryRaw<{ value: bigint }[]>`
        SELECT nextval('staff_id_seq') AS value
    `;

    const value = Number(result[0].value);

    return `STF-${String(value).padStart(6, '0')}`;
};
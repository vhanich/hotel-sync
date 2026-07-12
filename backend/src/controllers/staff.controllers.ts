import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import type { StaffRole } from '@prisma/client';

export const getAllStaff = async (req: Request, res: Response) => {
    try {
        const staff = await prisma.staff.findMany();
        return res.json(staff);
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
            staffId: await generateStaffId(role),
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
        const { name, email, role, password, pinCode } = req.body;

        const existingStaff = await prisma.staff.findUnique({ where: { id: String(id) } });
        if (!existingStaff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }

        const updatedData: any = {};
        if (name !== undefined) updatedData.name = name;
        if (email !== undefined) updatedData.email = email;
        if (role !== undefined) updatedData.role = role;

        if (password && role === 'ADMIN') {
            updatedData.hashedPassword = await bcrypt.hash(password, 10);
        }
        if (pinCode && (role === 'CLEANER' || role === 'REPAIRMAN')) {
            updatedData.hashedPinCode = await bcrypt.hash(pinCode, 10);
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

export const deleteStaff = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existingStaff = await prisma.staff.findUnique({ where: { id: String(id) } });
        if (!existingStaff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }

        if (existingStaff.role === 'ADMIN') {
            return res.status(400).json({ error: 'Cannot delete the ADMIN staff member' });
        }

        await prisma.staff.delete({ where: { id: String(id) } });
        return res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting staff member:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }               
};


const generateStaffId =  async (role: string) => {
    let prefix = 'EMP';
    if (role === 'CLEANER') {
        prefix = 'CLN';
    } else if (role === 'REPAIRMAN') {
        prefix = 'REP';
    } else if (role === 'ADMIN') {
        prefix = 'ADM';
    }

    const staffCount = await prisma.staff.count({ where: { role: role as StaffRole } });

    return `${prefix}-${(staffCount + 1).toString().padStart(3, '0')}`;
}
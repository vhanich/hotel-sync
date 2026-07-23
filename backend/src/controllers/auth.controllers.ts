import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { generateAccessToken } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
    const { staffId, password } = req.body;

    try {
        const user = await prisma.staff.findUnique({ where: { staffId } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid staff ID!' });
        }

        if (user.role !== "ADMIN") {
            return res.status(403).json({
                error: "Only ADMIN users can log in with password!"
            });
        }

        if (!user.hashedPassword) {
            return res.status(400).json({
                error: "Password is not configured."
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = await generateAccessToken({ id: user.id, role: user.role });

        return res.cookie( 'accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        }).status(200).json({ message: 'Login successful' });
        
    } catch (error: any) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginWithPin = async (req: Request, res: Response) => {
    const { staffId, pinCode } = req.body;

    try {
        const user = await prisma.staff.findUnique({ where: { staffId } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid Staff ID' });
        }
        
        if (user.role === 'ADMIN') {
            return res.status(403).json({
                error: 'ADMIN users cannot log in with pin code.'
            });
        }

        if (!user.hashedPinCode) {
            return res.status(400).json({
                error: 'Pin code is not configured for this user.'
            });
        }

        const isValidPin = await bcrypt.compare(pinCode, user.hashedPinCode);
        if (!isValidPin) {
            return res.status(401).json({ error: 'Invalid pin code' });
        }

        const token = await generateAccessToken({ id: user.id, role: user.role });

        return res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        }).status(200).json({ message: 'Login successful' });

    } catch (error: any) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMe = async (req: Request, res: Response) => {
    return res.status(200).json({
        status: 'success',
        data: {
            user: req.user
        } 
    });
};

export const logout = async (req: Request, res: Response) => {
    return res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    }).status(200).json({ message: 'Logged out successfully' });
};


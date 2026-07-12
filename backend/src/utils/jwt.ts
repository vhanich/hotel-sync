import { SignJWT, jwtVerify } from 'jose';
import { StaffRole } from '@prisma/client';

const secretKey = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export const generateAccessToken = async (user:{
    id: string,
    role: StaffRole
}) => {
    return await new SignJWT({ role: user.role })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setSubject(user.id)
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(secretKey);
};

export const verifyAccessToken = async (token: string) => {
    return await jwtVerify(token, secretKey);
};
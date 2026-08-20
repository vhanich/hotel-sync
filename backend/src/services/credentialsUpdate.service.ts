import bcrypt from 'bcrypt';
import type { StaffRole } from '@prisma/client';

interface CredentialsInput {
    role: StaffRole;
    password?: string;
    pinCode?: string;
}

export const prepareCredentialsUpdate = async ({
    role,
    password,
    pinCode
}: CredentialsInput) => {

    console.log('role', role);
    console.log('password', password);
    console.log('pin', pinCode);
    
    if (role === 'ADMIN') {
        if (!password) {
            throw new Error ('Password is required for ADMIN!');
        }

        return {
            hashedPassword: await bcrypt.hash(password, 10),
            hashedPinCode: null
        }
    }

    if (
        role === 'CLEANER' ||
        role === 'REPAIRMAN'
    ) {
        if (!pinCode) {
            throw new Error ('PIN Code is required for this role!');
        }

        return {
            hashedPassword: null,
            hashedPinCode: await bcrypt.hash(pinCode, 10)
        }
    }

    throw new Error('Invalid role');
};
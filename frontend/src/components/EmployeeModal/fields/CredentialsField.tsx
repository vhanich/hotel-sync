import { TextField } from '@mui/material';
import type {
    UseFormRegisterReturn,
} from 'react-hook-form';

import type { 
    StaffRole,
} from '../../../types/staff.types';

interface CredentialsFieldProps {
    role: StaffRole;

    password: UseFormRegisterReturn;
    confirmPassword: UseFormRegisterReturn;

    pinCode: UseFormRegisterReturn;
    confirmPinCode: UseFormRegisterReturn;

    passwordError?: string;
    confirmPasswordError?: string;

    pinCodeError?: string;
    confirmPinCodeError?: string;
}


export const CredentialsField = ({
    role,

    password,
    confirmPassword,

    pinCode,
    confirmPinCode,

    passwordError,
    confirmPasswordError,

    pinCodeError,
    confirmPinCodeError,
}: CredentialsFieldProps) => {
    if (role === 'ADMIN') {
        return (
            <>
                <TextField
                    label='New Password'
                    type='password'
                    {...password}
                    error={!!passwordError}
                    helperText={passwordError}
                    fullWidth
                />

                <TextField
                    label='Confirm Password'
                    type='password'
                    {...confirmPassword}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                    fullWidth
                />            
            </>
        );
    }
    return (
        <>
            
            <TextField
                label='New PIN'
                type='password'
                {...pinCode}
                error={!!pinCodeError}
                helperText={pinCodeError}
                fullWidth
            />

            <TextField
                label='Confirm PIN'
                type='password'
                {...confirmPinCode}
                error={!!confirmPinCodeError}
                helperText={confirmPinCodeError}
                fullWidth
            />
    
        </>
    );
};
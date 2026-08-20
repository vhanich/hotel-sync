import type {
    UseFormRegisterReturn,
} from 'react-hook-form';

import { MenuItem, TextField } from '@mui/material';

import { roles } from '../../../config/roles.config';


interface EmployeeFieldsProps {
    name: UseFormRegisterReturn;
    email: UseFormRegisterReturn;
    role: UseFormRegisterReturn;

    nameError?: string;
    emailError?: string;
    roleError?: string;
}

export const EmployeeFields = ({ 
    name,
    email,
    role,
    nameError,
    emailError,
    roleError,
}: EmployeeFieldsProps) => {
    return (
        <>
            <TextField
                label='Name'
                {...name}
                error={!!nameError}
                helperText={nameError}
                fullWidth
            />
            <TextField
                label='Email'
               {...email}
               error={!!emailError}
               helperText={emailError}
               fullWidth
            />
            <TextField
                select
                label='Role'
                {...role}
                error={!!roleError}
                helperText={roleError}
                fullWidth
            >
                {roles.map(role=>(
                    <MenuItem 
                        key={role.value}
                        value={role.value}
                    >
                            {role.label}
                    </MenuItem>
                ))}
            </TextField>
        </>
    );
};
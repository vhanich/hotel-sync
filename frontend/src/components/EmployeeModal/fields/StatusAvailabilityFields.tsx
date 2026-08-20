import {
    MenuItem,
    Stack,
    TextField
} from '@mui/material';

import type {
    UseFormRegisterReturn,
} from 'react-hook-form';

import { statuses } from '../../../config/statuses.config';
import { availabilityOptions } from '../../../config/availability.config';

interface StatusAvailabilityFieldsProps {
    status: UseFormRegisterReturn<'status'>;
    availability: UseFormRegisterReturn<'availability'>;

    statusError?: string;
    availabilityError?: string;
};

export const StatusAvailabilityFields = ({
    status,
    availability,
    statusError,
    availabilityError,
}: StatusAvailabilityFieldsProps) => {
    return (
        <Stack spacing={2}>
            <TextField
                select
                label='Status'
                {...status}
                error={!!statusError}
                helperText={statusError}
                fullWidth
            >
                {statuses.map(status => (
                    <MenuItem
                        key={status.value}
                        value={status.value}
                    >
                        {status.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label='Availability'
                {...availability}
                error={!!availabilityError}
                helperText={availabilityError}
                fullWidth
            >
                {availabilityOptions.map(option => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Stack>
    );
}
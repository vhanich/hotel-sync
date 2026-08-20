import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Stack } from '@mui/material';

import { CredentialsField } from '../fields/CredentialsField';

import { 
    createChangeCredentialsSchema,
    type ChangeCredentialsFormValues
 } from '../../../schemas/createCredentialsSchema'

import type {
    StaffRole,
    ChangeCredentialsDto
} from '../../../types/staff.types';

interface ChangeCredentialsFormProps {
    role: StaffRole;
    onSubmit: (credentials: ChangeCredentialsDto) => void;
};

export const ChangeCredentialsForm = ({
    role,
    onSubmit
}: ChangeCredentialsFormProps) => {

    const schema = createChangeCredentialsSchema(role);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<ChangeCredentialsFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: '',
            confirmPassword: '',
            pinCode: '',
            confirmPinCode: '',
        },
    });

    const handleFormSubmit = async (
        values: ChangeCredentialsDto
    ): Promise<void> => {
        onSubmit(values);
    };

    return (
        <Stack
            component='form'
            onSubmit={handleSubmit(handleFormSubmit)}
            spacing={3}
        >
            <CredentialsField
                role={role}

                password={register('password')}
                confirmPassword={register('confirmPassword')}

                pinCode={register('pinCode')}
                confirmPinCode={register('confirmPinCode')}

                passwordError={errors.password?.message}
                confirmPasswordError={
                    errors.confirmPassword?.message
                }

                pinCodeError={errors.pinCode?.message}
                confirmPinCodeError={
                    errors.confirmPinCode?.message
                }
            />

            <Button
                variant='contained'
                type='submit'
                disabled={isSubmitting}
            >
                Change Credentials
            </Button>
        </Stack>
    );
};
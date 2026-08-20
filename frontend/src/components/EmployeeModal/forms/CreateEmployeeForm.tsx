import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Stack } from '@mui/material';

import { EmployeeFields } from '../fields/EmployeeFields';
import { CredentialsField } from '../fields/CredentialsField';

import { 
    createEmployeeSchema, 
    type CreateEmployeeFormValues 
} from '../../../schemas/createEmployeeSchema';

import type { 
    CreateEmployeeDto,
} from '../../../types/staff.types';

interface CreateEmployeeFormProps {
    onSubmit: (data: CreateEmployeeDto) => Promise<void>;
};
    
export const CreateEmployeeForm = ({ 
    onSubmit 
}: CreateEmployeeFormProps) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        },
    } = useForm<CreateEmployeeFormValues>({
        defaultValues: {
            name: '',
            email: '',
            role: 'CLEANER',

            password: '',
            confirmPassword: '',

            pinCode: '',
            confirmPinCode: '',
        },
        resolver: zodResolver(createEmployeeSchema),
    });

    const role = watch('role');

    const handleFormSubmit = async (
        values: CreateEmployeeFormValues
    ) => {
        if (
            values.role === 'ADMIN' &&
            values.password
        ) {
            await onSubmit({
                name: values.name,
                email: values.email,
                role: 'ADMIN',
                password: values.password,
            });

            return;
        }

        if (
            values.role !== 'ADMIN' &&
            values.pinCode
        ) {
            await onSubmit({
                name: values.name,
                email: values.email,
                role: values.role,
                pinCode: values.pinCode,
            });
        }
    };

    return (
        <Stack 
            component='form'
            onSubmit={handleSubmit(handleFormSubmit)}
            spacing={3}
        >
            <EmployeeFields
                name={register('name')}
                email={register('email')}
                role={register('role')}

                nameError={errors.name?.message}
                emailError={errors.email?.message}
                roleError={errors.role?.message}
            />

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
                Create Employee
            </Button>
        </Stack>
    );
};

       
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Stack } from '@mui/material';

import { EmployeeFields } from '../fields/EmployeeFields';
import { StatusAvailabilityFields } from '../fields/StatusAvailabilityFields';
import { CredentialsField } from '../fields/CredentialsField';

import { 
    createEditEmployeeSchema,
    type EditEmployeeFormValues 
} from '../../../schemas/createEditEmployeeSchema';

import type { 
    UpdateEmployeeDto, 
    ChangeCredentialsDto, 
} from '../../../types/staff.types';

interface EditEmployeeFormProps {
    initialData: UpdateEmployeeDto;
    onSubmit: (
        data: UpdateEmployeeDto,
        credentials?: ChangeCredentialsDto
    ) => void;
};

export const EditEmployeeForm = ({ 
    initialData, 
    onSubmit 
}: EditEmployeeFormProps) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        },
    } = useForm<EditEmployeeFormValues>({
        defaultValues: {
            ...initialData,
            password: '',
            confirmPassword: '',
            pinCode: '',
            confirmPinCode: '',
        },
        resolver: zodResolver(createEditEmployeeSchema(initialData.role)),
    });

    const role = watch('role');

    const roleChanged = role !== initialData.role;

    

    const authenticationMethodChanged = 
        (
            initialData.role === 'ADMIN' &&
            role !== 'ADMIN'
        ) || (
            initialData.role !== 'ADMIN' &&
            role === 'ADMIN'
        );
    
    const shouldShowCredentials = roleChanged && authenticationMethodChanged;


    const handleFormSubmit = async (values: EditEmployeeFormValues) => {
        const {
            password,
            confirmPassword,
            pinCode,
            confirmPinCode,
            ...employeeData
        } = values;

        const credentials: ChangeCredentialsDto | undefined =
            shouldShowCredentials
                ? role === 'ADMIN'
                    ? { password }
                    : { pinCode }
                : undefined;

        await onSubmit(
            employeeData,
            credentials
        );
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
            <StatusAvailabilityFields
                status={register('status')}
                availability={register('availability')}

                statusError={errors.status?.message}
                availabilityError={
                    errors.availability?.message
                }
            />

            {shouldShowCredentials && (
                <CredentialsField
                    role={role}

                    password={register('password')}
                    confirmPassword={
                        register('confirmPassword')
                    }

                    pinCode={register('pinCode')}
                    confirmPinCode={
                        register('confirmPinCode')
                    }

                    passwordError={
                        errors.password?.message
                    }
                    confirmPasswordError={
                        errors.confirmPassword?.message
                    }

                    pinCodeError={
                        errors.pinCode?.message
                    }

                    confirmPinCodeError={
                        errors.confirmPinCode?.message
                    }
                />
            )}
            
            <Button
                variant='contained'
                type='submit'
                disabled={isSubmitting}
            >
                Update Employee
            </Button>
        </Stack>
    );
};
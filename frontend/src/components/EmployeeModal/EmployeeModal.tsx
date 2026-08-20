import { useState } from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { 
    createStaff, 
    updateStaff,
    changeCrendentials
} from '../../api/staff.api';

import { CreateEmployeeForm } from './forms/CreateEmployeeForm';
import { EditEmployeeForm } from './forms/EditEmployeeForm';
import { ChangeCredentialsForm } from './forms/ChangeCredentialsForm';

import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';

import type {
    Staff,  
    CreateEmployeeDto, 
    UpdateEmployeeDto,
    ChangeCredentialsDto
} from '../../types/staff.types';
import { mapStaffToUpdateData } from '../../utils/staff.mapper';

type EmployeeModalMode = 'create' | 'edit' | 'credentials';


interface EmployeeModalProps {
    open: boolean,
    mode: EmployeeModalMode,
    employee?: Staff | null,
    onClose: () => void,
}

interface PendingUpdate {
    data: UpdateEmployeeDto;
    credentials?: ChangeCredentialsDto;
}

interface PendingCredentialsChange {
    credentials: ChangeCredentialsDto;
}

export const EmployeeModal = ({
    open,
    mode,
    employee,
    onClose
}: EmployeeModalProps) => {

    const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
    
    const [ pendingUpdate, setPendingUpdate ] =
        useState<PendingUpdate | null>(null);

    const [pendingCredentialsChange, setPendingCredentialsChange] =
        useState<PendingCredentialsChange | null>(null);    

    const handleCreateEmployee = async (data: CreateEmployeeDto) => {

        await createStaff(data);
        onClose();
    };

    const handleUpdateEmployee = (
        data: UpdateEmployeeDto,
        credentials?: ChangeCredentialsDto
    ) => {
        setPendingUpdate({
            data,
            credentials
        });

        setConfirmOpen(true);
    };

    const handleChangeCredentials = (
        credentials: ChangeCredentialsDto
    ) => {
        
        if (!employee) return;

        setPendingCredentialsChange({
            credentials,
        });

        setConfirmOpen(true);
    };

    const getTitle = (): string => {
        switch (mode) {
            case 'create':
                return 'Add Employee';

            case 'edit':
                return 'Update Employee';

            case 'credentials':
                return 'Change Credentials';
        }
    };

    const handleConfirm = async () => {
        if (!employee) return;

        if (pendingUpdate) {
            await updateStaff(
                employee.id,
                pendingUpdate.data,
                pendingUpdate.credentials
            );
        }

        if (pendingCredentialsChange) {
            await changeCrendentials(
                employee.id,
                pendingCredentialsChange.credentials
            );
        }

        setConfirmOpen(false);
        setPendingUpdate(null);
        setPendingCredentialsChange(null);
        onClose();
    };

    const handleCancelConfirmation = () => {
        setConfirmOpen(false);

        setPendingUpdate(null);
        setPendingCredentialsChange(null);
    };



    return (
       <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>
                    { getTitle() }

                    <IconButton
                        onClick={onClose}
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            right: 15,
                            top: 10,
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    {mode === 'create' && (
                        <CreateEmployeeForm onSubmit={handleCreateEmployee} />
                    )}

                    {mode === 'edit' && employee && (
                        <EditEmployeeForm
                            initialData={mapStaffToUpdateData(employee)}
                            onSubmit={handleUpdateEmployee}
                        />
                    )}  
                    {mode === 'credentials' && employee && (
                        <ChangeCredentialsForm
                            role={employee.role}
                            onSubmit={handleChangeCredentials}
                        />    
                    )}
                </DialogContent>
            </Dialog>


            <ConfirmationDialog
                open={confirmOpen}
                onClose={handleCancelConfirmation}
                onConfirm={handleConfirm}
            />
       </>
    );
};
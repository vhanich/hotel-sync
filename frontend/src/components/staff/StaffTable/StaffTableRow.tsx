import { useState } from 'react';

import { TableRow, TableCell } from '@mui/material';

import { changeCrendentials } from '../../../api/staff.api';
import { formatLabel } from '../../../utils/staff.utils';

import { StaffRowMenu } from './StaffRowMenu';

import type { ChangeCredentialsDto, Staff } from '../../../types/staff.types';
import { ChangeCredentialsForm } from '../../EmployeeModal/forms/ChangeCredentialsForm';

interface StaffTableRowProps {
    employee: Staff;
    onEdit: (employee: Staff) => void;
    onChangeCredentials: (employee: Staff) => void;
}

export const StaffTableRow = ({ employee, onEdit, onChangeCredentials }: StaffTableRowProps) => {

    return (
        <>
            <TableRow hover>
                <TableCell>{employee.staffId}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{formatLabel(employee.role)}</TableCell>
                <TableCell>{formatLabel(employee.status)}</TableCell>
                <TableCell>{formatLabel(employee.availability)}</TableCell>
                <TableCell width={100}>
                    <StaffRowMenu 
                        onEdit={() => onEdit(employee)} 
                        onChangeCredentials={() => onChangeCredentials(employee)}
                    />
                </TableCell>
            </TableRow>
        </>
    );
};
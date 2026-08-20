import React, { useState } from 'react';

import {
    Table,
    TableBody,
    TableContainer,
} from '@mui/material';

import type { Staff } from '../../../types/staff.types';
import { StaffTableHead } from './StaffTableHead';
import { StaffTableRow } from './StaffTableRow';
import { StaffTablePagination } from './StaffTablePagination';


interface StaffTableProps {
    staff: Staff[],
    total: number,

    page: number,
    limit: number,

    setPage: React.Dispatch<React.SetStateAction<number>>,
    setLimit: React.Dispatch<React.SetStateAction<number>>,
    
    onEdit: (employee: Staff) => void,
    onChangeCredentials: (employee: Staff) => void,

    isLoading?: boolean,
}

export const StaffTable = ({ 
    staff,
    total,
    page,
    limit,
    setPage,
    setLimit,
    onEdit,
    onChangeCredentials,
}: StaffTableProps ) => {

    return (
            <TableContainer>
                <Table stickyHeader >
                    <StaffTableHead/>

                    <TableBody>
                        {staff.map((employee) => (
                            <StaffTableRow 
                                key={employee.id}
                                employee={employee} 
                                onEdit={onEdit}
                                onChangeCredentials={onChangeCredentials}
                            />
                        ))}
                        
                    </TableBody>


                    <StaffTablePagination
                        page={page}
                        limit={limit}
                        total={total}

                        onPageChange={setPage}
                        onLimitChange={setLimit}
                    />
                </Table>
            </TableContainer> 
    );
}
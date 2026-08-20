import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography
} from '@mui/material';

import { useStaff } from '../hooks/useStaff';

import { StaffTable } from '../components/staff/StaffTable/StaffTable';
import { EmployeeModal } from '../components/EmployeeModal/EmployeeModal';
import { StaffToolbar } from '../components/staff/StaffTable/StaffTableToolbar';

import type { Staff, StaffRole, EmployeeModalMode } from '../types/staff.types';

export const StaffPage: React.FC = () => {
    const { 
        staff, 
        total, 
        filters,    
        page, 
        limit, 
        setPage, 
        setLimit,
        setFilters
    } = useStaff();

    const [modalMode, setModalMode] =
        useState<EmployeeModalMode | null>(null);

    const [selectedEmployee, setSelectedEmployee] =
        useState<Staff | null>(null);

    

    return (
        <Box>
            <Button
                variant='contained'
                onClick={() => {
                    setSelectedEmployee(null);
                    setModalMode('create')
                }}
            >
                Add Member
            </Button>

            <EmployeeModal
                mode={modalMode ?? 'create'}
                open={modalMode !== null}
                employee={selectedEmployee}
                onClose={() => {
                    setModalMode(null)
                    setSelectedEmployee(null);
                }}
            />

            <Typography>
                Staff Management
            </Typography>

            <Paper>
                <StaffToolbar
                    search={filters.search}
                    roles={filters.roles}

                    onSearchChange={(value: string) => {
                        setFilters(prev => ({
                            ...prev,
                            search: value
                        }))
                    }}
                    onRolesChange={(roles: StaffRole[]) => {
                        setFilters(prev => ({
                            ...prev,
                            roles: roles
                        }))
                    }}
                    
                />


                <StaffTable 
                    staff={staff}
                    total={total}
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}

                    onEdit={(employee: Staff) => {
                        setSelectedEmployee(employee);
                        setModalMode('edit')
                    }}

                    onChangeCredentials={(employee: Staff) => {
                        setSelectedEmployee(employee)
                        setModalMode('credentials')
                    }}
                />    
            </Paper>  
        </Box>
  );
};

export default StaffPage;
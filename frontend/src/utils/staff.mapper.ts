import type {
    Staff,
    UpdateEmployeeDto,
} from '../../src/types/staff.types';

export const mapStaffToUpdateData = (staff: Staff): UpdateEmployeeDto => {
    return {
        name: staff.name,
        email: staff.email,
        role: staff.role,
        status: staff.status,
        availability: staff.availability,
    };
};
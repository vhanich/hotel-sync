import API from '../services/api-axios';
import type { 
    Staff,
    StaffResponse,
    StaffQueryParams,
    CreateEmployeeDto,
    UpdateEmployeeDto,
    ChangeCredentialsDto
 } from '../types/staff.types';

export const getStaff = async (
    params: StaffQueryParams
): Promise<StaffResponse> => {

    const response = await API.get<StaffResponse>(
        '/staff',
    { 
        params
    });

    return response.data;
};

export const createStaff = async (
    data: CreateEmployeeDto
): Promise<Staff> => {

    const response = await API.post<Staff>(
        '/staff',
        data
    );

    return response.data;
};

export const updateStaff = async (
    id: string,
    data: UpdateEmployeeDto,
    credentials?: ChangeCredentialsDto
): Promise<Staff> => {

    const response = await API.patch<Staff>(
        `/staff/${id}`,
        {
            ...data,
            ...credentials
        }
    );

    return response.data;
};

export const changeCrendentials = async (
    id: string,
    credentials: ChangeCredentialsDto
): Promise<Staff> => {
    const response = await API.patch<Staff>(
        `/staff/${id}/credentials`,
        credentials
    );

    return response.data
};


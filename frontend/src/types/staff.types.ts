export interface StaffQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    roles?: string;
    availability?: string;
};

export interface StaffResponse {
    data: Staff[],
    total: number
};

export type StaffRole = 
    'ADMIN' | 'CLEANER' | 'REPAIRMAN';

export const STAFF_ROLES: StaffRole[] = [
    'ADMIN',
    'CLEANER',
    'REPAIRMAN',
];    

export type StaffAvailability = 
    'AVAILABLE' | 'UNAVAILABLE' | 'DAY_OFF' | 'SICK_LEAVE' | 'VACATION';

export type StaffStatus = 
    'ACTIVE' | 'INACTIVE' | 'TERMINATED';
  
export interface Staff {
    id: string,
    staffId: string,
    email: string,
    name: string,
    role: StaffRole,
    availability: StaffAvailability,
    status: StaffStatus
};

export interface StaffFilters {
    search: string;
    roles: StaffRole[];
    statuses: StaffStatus[];
    availability: StaffAvailability[];
};   

export interface EmployeeBase {
    name: string;
    email: string;
    role: StaffRole;
};

export interface EmployeeStatusData {
    status: StaffStatus;
    availability: StaffAvailability;
};

export type CreateEmployeeDto =
    | {
        name: string;
        email: string;
        role: 'ADMIN';
        password: string;
    }
    | {
        name: string;
        email: string;
        role: 'CLEANER' | 'REPAIRMAN';
        pinCode: string;
    };

export interface UpdateEmployeeDto extends EmployeeBase, EmployeeStatusData {};

export interface ChangeCredentialsDto  {
    password?: string;
    pinCode?: string;
}; 

export interface CreateEmployeeFormValues extends EmployeeBase {
    password: string;
    confirmPassword: string;
    pinCode: string;
    confirmPinCode: string;
};

export interface ChangeCredentialsFormValues {
    password: string;
    confirmPassword: string;
    pinCode: string;
    confirmPinCode: string;
}


export interface EmployeeFieldsForm {
    name: string;
    email: string;
    role: StaffRole;
}


export type EmployeeModalMode =
    | 'create'
    | 'edit'
    | 'credentials';
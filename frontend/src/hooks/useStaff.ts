import axios from 'axios';
import { useEffect, useState } from 'react';

import { getStaff } from '../api/staff.api';

import type { Staff, StaffFilters } from '../types/staff.types';
import type { ApiError } from '../types/api.types';



interface UseStaffResult {
    staff: Staff[],
    total: number,

    page: number,
    limit: number,

    filters: StaffFilters

    loading: boolean,
    error: ApiError | null

    setPage: React.Dispatch<React.SetStateAction<number>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    setFilters: React.Dispatch<React.SetStateAction<StaffFilters>>;
}

export const useStaff = (): UseStaffResult => {
    const [ staff, setStaff ] = useState<Staff[]>([]);
    const [ total, setTotal ] = useState(0);

    const [ filters, setFilters ] = useState<StaffFilters>({
        search: '',
        roles: [],
        statuses: [],
        availability: []
    });

    const [ page, setPage ] = useState(0);
    const [ limit, setLimit ] = useState(10);

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<ApiError | null>(null);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getStaff({
                    page,
                    limit,
                    search: filters.search,
                    roles: filters.roles.join(','),

                });

                setStaff(response.data);
                setTotal(response.total)
            } catch (err) {
                if (axios.isAxiosError<ApiError>(err)) {

                    setError(
                        err.response?.data ?? {
                            message: 'Something went wrong'
                        }
                    );

                } else {

                    setError({
                        message: 'Unexpected error'
                    });

                }
                
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, [page, limit, filters]);

    return {
        staff,
        total,
        page,
        limit,
        filters,
        loading,
        error,
        setPage,
        setLimit,
        setFilters,
    };
};
import { useEffect, useState } from 'react';

export type UpdateField<T> = <K extends keyof T>(
    field: K, 
    value: T[K]
) => void;

export const useEmployeeForm = <T extends object>(initialData: T) => {
    const [formData, setFormData] = useState<T>(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const updateField: UpdateField<T> = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = (data: T = initialData) => {
        setFormData(data);
    };
    
    return {
        formData,
        setFormData,
        updateField,
        resetForm
    };
};
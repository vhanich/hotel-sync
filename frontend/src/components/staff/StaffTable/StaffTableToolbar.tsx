import { 
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import  SearchIcon  from '@mui/icons-material/Search';
import type { SelectChangeEvent } from '@mui/material';

import { STAFF_ROLES } from '../../../types/staff.types';
import type {  StaffRole } from '../../../types/staff.types';

interface StaffToolbarProps{
    search: string;
    roles: StaffRole[];

    onSearchChange: (value: string) => void,
    onRolesChange: (roles: StaffRole[]) => void, 
}

export const StaffToolbar: React.FC<StaffToolbarProps> = ({
    search,
    roles,
    onSearchChange,
    onRolesChange
}) => {
    const handleRoleChange = (e: SelectChangeEvent<typeof roles>) => {
        const value = e.target.value;
        onRolesChange(typeof value === 'string' 
            ? value.split(',') as StaffRole[] 
            : value
        );
    };
    

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                p: 2,
                flexWrap: 'wrap'
            }}
        >
            <Box sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
            }}>
                <TextField 
                    placeholder='Search team member'
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        onSearchChange(e.target.value)
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <FormControl>

                    <Select
                        multiple
                        displayEmpty
                        value={roles}
                        onChange={handleRoleChange}
                        renderValue={(selected) => selected.length === 0 ? 'All roles' : `${selected.length} selected`}
                    >
                        {STAFF_ROLES.map((role) => (
                            <MenuItem key={role} value={role}>{role}</MenuItem>
                        ))}
                        
                    </Select> 

                </FormControl>
            </Box>

        </Box>
    );
};
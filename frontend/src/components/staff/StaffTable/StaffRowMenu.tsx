import { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface StaffRowMenuProps {
    onEdit: () => void;
    onChangeCredentials: () => void;
}

export const StaffRowMenu = ({ onEdit, onChangeCredentials }: StaffRowMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleOpenMenu}>
                <MoreVert />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={() => { onEdit(); handleCloseMenu(); }}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => { onChangeCredentials(); handleCloseMenu(); }}>
                    Change Credentials
                </MenuItem>
            </Menu>
        </>
    );
};    
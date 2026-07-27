import axios from 'axios';
import { useLocation, NavLink } from 'react-router-dom';
import { 
    Drawer, 
    Toolbar, 
    Divider, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon,
    ListItemText,
    Button,
    
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { navigationItems } from '../../config/navigation';
import { rolePermissions } from '../../config/permissions';

// const DRAWER_WIDTH = 240;

export const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const avaliableItems = navigationItems.filter(item => {
        if (!user?.role) return false;

        const userPermissions = rolePermissions[user.role] || [];

        return userPermissions.includes(item.permission);

    });

    const handleLogOut = async () => {
        try {
            await logout();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
            } else {
                console.error(err);
            }
        }
    };

    return (
        <Drawer
            variant='permanent'
        >
            <Toolbar />

            <Divider />

            <List>
                {avaliableItems.map(item => {
                    const isActive = location.pathname === item.path;

                    return (
                        <ListItem key={item.path} disablePadding>
                        
                        <ListItemButton
                            component={NavLink}
                            to={item.path}
                            selected={isActive}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                    );
                    
                })}
            </List>

            <Divider />

            <Button onClick={handleLogOut}> Log Out</Button>

        </Drawer>
    );
};
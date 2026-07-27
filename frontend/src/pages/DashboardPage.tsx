import {
    Box,
    Typography
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export const DashboardPage = () => {
    const {user, authLoading} = useAuth();

    if (authLoading) {
        return 'Loading...'
    }

    return (
        <Box>
            <Typography variant='h4' gutterBottom>
                Dashboard
            </Typography>

            <Typography
                variant='body1'
                color='text.secondary'
            >
                Welcome back {user?.role}!
            </Typography>
        </Box>
    );
}
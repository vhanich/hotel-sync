import { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from '@mui/material';

interface LoginFormProps {
    handleLogin: (staffId: string, password: string) => Promise<void>,
    error?: string,
    loading: boolean
}

export const LoginForm: React.FC<LoginFormProps> = ({
    handleLogin,
    error,
    loading
}) => {
    const [staffId, setStaffId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [staffIdError, setStaffIdError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let hasError = false;
        if (!staffId) {
            setStaffIdError('Staff ID is required!');
            hasError = true;
        }

        if (!password) {
            setPasswordError('Password is required!');
            hasError = true;
        }

        if (hasError) return;

        await handleLogin(staffId, password);
    };

    return (
        <Paper 
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 420,
                mx: "auto",
            }}
        >
            <Box 
                component='form'
                onSubmit={onSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <Typography
                    variant='h4'
                    align='center'
                    sx={{ fontWeight: 600}}
                >
                    Login
                </Typography>

                {error && (
                    <Alert severity='error'>
                        {error}
                    </Alert>
                )}

                <TextField
                    label='Staff ID'
                    value={staffId}
                    onChange={(e) => {
                        setStaffId(e.target.value);
                        setStaffIdError('');
                    }}
                    error={Boolean(staffIdError)}
                    helperText={staffIdError}
                    autoComplete='username'
                    fullWidth
                    inputMode='text'
                />

                <TextField 
                    label='Password'
                    value={password}
                    type='password'
                    autoComplete='current-password'
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                    }}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    fullWidth
                    
                />

                <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>                

            </Box>
        </Paper>
    );
};
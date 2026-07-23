import { useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { PinDisplay } from './PinDisplay';
import { NumericKeypad } from './NumericKeypad';

interface PinLoginProps {
    handleLogin: (staffId: string, pinCode: string) => Promise<void>;
    error?: string,
    loading: boolean
}

const MAX_PIN_LENGTH = 4;

export const PinLoginForm: React.FC<PinLoginProps> = ({
    error,
    handleLogin,
    loading
}) => {
    const [staffId, setStaffId] = useState('');
    const [pinCode, setPinCode] = useState('');

    const [staffIdError, setStaffIdError] = useState('');
    
    const handleKey = (key: string) => {
        switch (key) {
            case 'Backspace':
                case '⌫':
                    setPinCode((prev) => prev.slice(0, -1));
                    break;
    
            case 'Delete':
                case 'C':
                    setPinCode('');
                    break;
    
            default:
                if (/^\d$/.test(key)) {
                    setPinCode(prev =>
                        prev.length < MAX_PIN_LENGTH
                            ? prev + key
                            : prev
                    );
                }
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
           const target = event.target as HTMLElement;

            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA'
            ) {
                return;
            }

            handleKey(event.key);
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [pinCode]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let hasError = false;

        if (!staffId) {
            setStaffIdError('Staff ID is required!');
            hasError = true;
        }
        if (pinCode.length !== MAX_PIN_LENGTH) {
            return;
        }


        if (!hasError) {
           await handleLogin(staffId, pinCode);
        }
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
                    Staff Login
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
                    fullWidth
                    inputMode='text'
                />

                <Box
                    sx={{
                        display: 'flex', 
                        justifyContent: 'center'
                    }}
            
                >
                    <PinDisplay
                        value={pinCode}
                        length={MAX_PIN_LENGTH}
                        error={error}
                    />
                </Box>

                <NumericKeypad onKeyPress={handleKey} />
                
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
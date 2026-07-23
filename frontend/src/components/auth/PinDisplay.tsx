import { Box } from '@mui/material';

interface PinDisplayProps {
    value: string;
    length?: number;
    error?: string
}

export const PinDisplay: React.FC<PinDisplayProps> = ({ value, length = 4, error }) => {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 1,
                mb: 2,
                p: 1,
            }}
        >
            {Array.from({ length }).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '40px',
                        height: '40px',
                        margin: '0 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        backgroundColor: value.length > index ? '#fff' : '',
                        color: value.length > index ? '#000' : '#fff',
                        border: error
                    ? '1px solid red'
                    : '1px solid #c6c6c6',
                borderRadius: 1, 
                    }}
                >
                    {value[index] && '●'}
                </Box>
            ))}
            
        </Box>
    );
};

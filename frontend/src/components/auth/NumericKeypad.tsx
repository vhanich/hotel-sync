import { Button, Grid } from '@mui/material';

const KEYS = [
    '1', '2', '3', 
    '4', '5', '6', 
    '7', '8', '9', 
    'C', '0', '⌫'
];

interface NumericKeypadProps {
    onKeyPress: (digit: string) => void;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({ onKeyPress }) => {

    return (
        <Grid 
            container 
            spacing={1}
            sx={{
                maxWidth: 220,
                margin: '0 auto',
                
            }}
        >
            {KEYS.map((key) => (
                <Grid
                    key={key}
                >
                    <Button
                        fullWidth
                        variant='contained'
                        size='large'
                        onClick={() => onKeyPress(key)}
                        sx={{
                            height: 64,
                        }}
                    >
                        {key}
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
}
import React from 'react';
import { Typography, Button, Container, Paper } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from 'react-router-dom';

export const ForbiddenPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Paper elevation={3}>
                <BlockIcon/>
                <Typography variant='h3' gutterBottom>
                    403
                </Typography>
                <Typography variant='h5' gutterBottom>
                    Forbidden
                </Typography>
                <Typography variant='body1'>
                    You do not have sufficient permissions to view this page.
                </Typography>
                <Button
                    variant='contained'
                    onClick={() => navigate('/dashboard')}
                >
                    Return to home page
                </Button>
            </Paper>
        </Container>
    );
};
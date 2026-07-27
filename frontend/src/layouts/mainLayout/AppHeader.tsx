import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export const AppHeader = () => {
    return (
        <AppBar 
            position='fixed'
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >

            <Toolbar>

                <Typography>
                    Hotel Sync
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Typography>
                    {/* {user.staffId} */}
                </Typography>

            </Toolbar>

        </AppBar>
    );
}
import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

interface NavBarProps {
    openCreateBookForm: () => void;
}

export function NavBar({
    openCreateBookForm
}: NavBarProps) {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    onClick={() => window.location.href = '/'}
                >
                    MUI
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button
                        sx={{ color: '#fff' }}
                        onClick={openCreateBookForm}>
                        Create New Book
                    </Button>
                    <Button
                        sx={{ color: '#fff' }}
                        href='pricing'>
                        Pricing
                    </Button>
                    <Button
                        sx={{ color: '#fff' }}
                        href='about'>
                        About us
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

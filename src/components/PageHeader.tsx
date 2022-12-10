import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import './PageHeader.css';

function PageHeader(props: any) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor: "rgb(25, 26, 25)"}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <HomeIcon fontSize={"large"}/>
                    </IconButton>
                    <label className="logoLabel">
                       BULLSEYE
                    </label>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default PageHeader;
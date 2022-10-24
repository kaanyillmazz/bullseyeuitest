import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import './PageHeader.css';
import {useNavigate} from "react-router-dom";

function PageHeader(props: any) {
    let title0 = props.title;

    let navigate = useNavigate();

    const navigator = () => {
        navigate(`/`, {replace: false});
    }

    let companyLabel;
    if(title0.length > 0){
        title0 = " "+title0;
        companyLabel = <label className="companyLabel">{title0}</label>
    }

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
                        onClick={()=>{navigator();}}
                    >
                        <HomeIcon fontSize={"large"}/>
                    </IconButton>
                    <label className="logoLabel">
                       BULLSEYE
                    </label>
                    {companyLabel}


                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default PageHeader;
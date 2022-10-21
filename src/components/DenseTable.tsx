import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";



function DenseTable() {
    const dataObject = useSelector((state: any) => state.indexDatabase.indexValueArray);
    let navigate = useNavigate();

    const navigator = (indexTitle: number) => {
        navigate(`/index/${indexTitle}`, {replace: false});
    }

    return (
        dataObject.map((dataset: any, index: number) => (
                    <Box sx={{width: 200, height: 150}}>
                        <Card variant="outlined" sx={{backgroundColor: "rgb(30, 81, 40)"}} onClick={() => { navigator(dataset.title) }}>
                            <React.Fragment>

                                <CardContent>
                                    <Typography sx={{ fontSize: 25, color:"rgb(202,206,202)"}} >
                                        {dataset.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: 20, color:"rgb(202,206,202)" }}  gutterBottom>
                                        {dataset.value}
                                    </Typography>
                                </CardContent>
                            </React.Fragment>
                        </Card>
                    </Box>
            ))
    );
}


export default DenseTable;


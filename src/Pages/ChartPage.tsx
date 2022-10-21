import React from "react";
import {Grid} from "@mui/material";
import ChartGraph from "../components/ChartGraph";
import {useParams} from "react-router-dom";

function ChartPage() {
    let {title} = useParams();
   let title0 = title;



    return (
        <Grid container display="flex" justifyContent="center">
            <Grid item xs={12} display="flex" justifyContent="center" justifyItems="center">
                <label>{title0}</label>
            </Grid>
            <Grid item xs={12}>
                <ChartGraph title={title0}/>
            </Grid>

        </Grid>

    );
}

export default ChartPage;
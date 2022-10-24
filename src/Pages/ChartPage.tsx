import React from "react";
import {Grid} from "@mui/material";
import ChartGraph from "../components/ChartGraph";
import {useParams} from "react-router-dom";
import PageHeader from "../components/PageHeader";

function ChartPage() {
    let {title} = useParams();
   let title0 = title;



    return (
        <div>
            <PageHeader title={title0}/>
            <Grid container display="flex" justifyContent="center">
                <Grid item xs={12}>
                    <ChartGraph title={title0}/>
                </Grid>
            </Grid>
        </div>


    );
}

export default ChartPage;
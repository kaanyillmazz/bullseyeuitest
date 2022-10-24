import React from "react";
import DenseTable from "../components/DenseTable";
import {Grid} from "@mui/material";
import axios from "axios";
import {useDispatch} from "react-redux";
import {indexData, setValues} from "../features/indexDatabaseSlice";
import './MainPage.css';

function MainPage() {
    const dispatch = useDispatch();

    let yAxisData: any = [];
    let xAxisData: any = [];
    let objectArray: any = [];

    axios.get("https://query1.finance.yahoo.com/v7/finance/quote?symbols=ABT,AZO")
        .then(res => {
            for (const dataObj of res.data.quoteResponse.result) {
                yAxisData.push(parseInt(dataObj.marketCap));
                xAxisData.push(dataObj.shortName);
                for (let i = 0;  xAxisData.length > i ; i++ ) {
                    objectArray[i] = new indexData(yAxisData[i], xAxisData[i]);
                    console.log(objectArray[i]);
                }
            }
            console.log(objectArray);
            dispatch(setValues(objectArray));
        });


    return(
        <Grid container xs={12}>
            <Grid container xs={12} sx={{padding: 10}}>
                <Grid item xs={12} display={"flex"} justifyContent={"center"} flexWrap={"wrap"} className="indexCatalog" >
                    <DenseTable/>
                </Grid>
            </Grid>


        </Grid>
    );
}
export default MainPage;
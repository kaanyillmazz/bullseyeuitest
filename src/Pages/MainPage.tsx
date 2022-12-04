import React, {useState} from "react";
import DenseTable from "../components/DenseTable";
import {Grid} from "@mui/material";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {indexData, setValues} from "../features/indexDatabaseSlice";
import './MainPage.css';
import DataTable from "../components/DataTable";
import ChartPage from "./ChartPage";
import {useParams} from "react-router-dom";
import {catto} from "../Data";
import LineChart from "../components/LineChart";

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



    const indexLabel = useSelector((state: any) => state.indexName.indexName);


    let {title} = useParams();
    let title0 = title;



    const [userData, setUserData] = useState({
            labels: catto.map((data) => data.Timestamp),
            datasets: [
                {
                    label: indexLabel,
                    data: catto.map((data) => data.Value),
                    borderColor: "red",
                    borderWidth: 1,
                    radius: 0,
                },
            ],
            options: {
                interaction: {
                    intersect: false
                },
                plugins: {
                    legend: false
                },
                scales: {
                    x: {
                        type: 'linear'
                    }
                }
            }
        }
    );


    return(
        <Grid container xs={12}>
            <Grid container xs={12} sx={{padding: 10}}>
                <Grid item xs={12} display={"flex"} justifyContent={"center"} flexWrap={"wrap"} className="indexCatalog" >
                    <div className="App">
                        <div style={{ width: 700 }}>
                            <LineChart chartData={userData} />
                        </div>

                    </div>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"center"} flexWrap={"wrap"} className="indexCatalog" >
                    <DataTable/>
                </Grid>

            </Grid>


        </Grid>
    );
}
export default MainPage;
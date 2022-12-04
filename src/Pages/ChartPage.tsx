import React from "react";
import {Grid} from "@mui/material";
import ChartGraph  from "../components/ChartGraph";
import {useParams} from "react-router-dom";
import PageHeader from "../components/PageHeader";
import * as echarts from 'echarts';
import { useState } from "react";


import LineChart from "../components/LineChart";
import { catto } from "../Data";


function ChartPage() {
    let {title} = useParams();
   let title0 = title;



    const [userData, setUserData] = useState({
        labels: catto.map((data) => data.Timestamp),
        datasets: [
            {
                label: "Index Value",
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



    return (
        <div>
            <PageHeader title={title0}/>

            <div className="App">
            <div style={{ width: 700 }}>
                <LineChart chartData={userData} />
            </div>

            </div>
        </div>


    );
}

export default ChartPage;
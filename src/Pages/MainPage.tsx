import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import axios from "axios";
import './MainPage.css';
import {Line} from "react-chartjs-2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

function TableData(
    name: string,
    value: number,
) {
    return {name, value};
}

let rows = [
    TableData('S&P 500',  4.0),
    TableData('Dow Jones Industrial Average',   4.3),
    TableData('Russell 2000',  6.0),
    TableData('Nasdaq Composite',   4.3),
    TableData('NYSE Arca Oil Index',  3.9),
];

function convertTime(timestamp:string) {
    const date = new Date(parseInt(timestamp));
    let result = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    return result
}

function MainPage() {
    let BaseURL = "http://localhost:8080/Indices/S&P%20500";
    let empSal: any = [];
    let empAge: any = [];


    const [tableData, setTableData] = useState(
            [
                TableData('S&P 500', 0),
                TableData('Dow Jones Industrial Average',0),
                TableData('Russell 2000',  0),
                TableData('Nasdaq Composite',   0),
                TableData('NYSE Arca Oil Index',   0)
]
    );


    const drawTable = () => {
        //TODO axios get every value
        //TODO set every value

        let value1 = 0;
        let value2 = 1;
        let value3 = 2;
        let value4 = 3;
        let value5 = 4;
        setTableData([
            TableData('S&P 500',  value1),
            TableData('Dow Jones Industrial Average',  value2),
            TableData('Russell 2000',  value3),
            TableData('Nasdaq Composite',  value4),
            TableData('NYSE Arca Oil Index',   value5)]);
    }

    const [userData, setUserData] = useState({
            labels: empSal,
            type: 'line',
            datasets: [
                {
                    label: "Index Values",
                    data: empAge,
                    borderColor: 'rgb(40, 84, 48)',
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
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 5
                        }
                    }],
                    x: {
                        type: 'linear'
                    }
                }
            }
        }
    );

    const Chart = () => {
        let empSal: any = [];
        let empAge: any = [];

        axios.get(BaseURL)
            .then(res => {
                for (const dataObj of res.data.response) {
                    empSal.push(convertTime(dataObj.Timestamp));
                    empAge.push(dataObj.Value);
                }

                setUserData({
                    labels: empSal,
                    type: 'line',
                    datasets: [
                        {
                            label: "Index Values",
                            data: empAge,
                            borderColor: 'rgb(40, 84, 48)',
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
                            xAxes: [{
                                ticks: {
                                    maxTicksLimit: 5
                                }
                            }],
                            x: {
                                type: 'linear'
                            }
                        }
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })


    }

    useEffect(() => {
        Chart();
        drawTable();
    }, []);


    function DataTable() {
        const indexSetter = (indexTitle: string) => {
            //TODO check indexTitle
            //TODO set baseURL accordingly
            BaseURL = "http://localhost:8080/Indices/S&P%20500"
            Chart();
            drawTable();
        }

        return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 550, backgroundColor: "rgb(233, 234, 226)"}}  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{border: 0}}
                            >
                                <TableCell onClick={() => {
                                    indexSetter(row.name)
                                }} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <Grid container xs={12}>
            <Grid container xs={12} sx={{padding: 10}}>
                <Grid item xs={12} display={"flex"} justifyContent={"center"} flexWrap={"wrap"} className="indexCatalog">
                    <div className="lineChart">
                        <div style={{width: 700}}>
                            <Line data={userData}/>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"center"} flexWrap={"wrap"} className="indexCatalog">
                    <div className="dataTable">
                        <DataTable/>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainPage;
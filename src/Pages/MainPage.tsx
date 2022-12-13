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
    symbol: string,
    high: number,
    low: number,
    value: number,
) {
    return {name, symbol, high, low, value};
}

let rows = [
    TableData('S&P 500', "SP", 24, 24, 4.0),
    TableData('Dow Jones Industrial Average', "DOW", 9.0, 37, 4.3),
    TableData('Russell 2000', "RSSL", 16.0, 24, 6.0),
    TableData('Nasdaq Composite', "NSDQ", 3.7, 67, 4.3),
    TableData('NYSE Arca Oil Index', "NYSE", 16.0, 49, 3.9),
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
    }, []);


    function DataTable() {
        const indexSetter = (indexTitle: string) => {
            //TODO title alip ona gore chart degisicek
            BaseURL = "http://localhost:8080/Indices/S&P%20500"
            Chart();
        }

        return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 550, backgroundColor: "rgb(233, 234, 226)"}}  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Symbol</TableCell>
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
                                <TableCell align="right">{row.symbol}</TableCell>
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
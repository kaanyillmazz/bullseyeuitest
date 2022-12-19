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
    TableData('DJIA',   4.3),
    TableData('Russell 1000',  6.0),
    TableData('S&P 500 Equal Weight',   4.3),
    TableData('DJIA Capped', 3.9),
    TableData('S&P 500 Real Estate', 3.9),
    TableData('BULL 100', 3.9)
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
            TableData('S&P 500', 4.0),
            TableData('DJIA', 4.3),
            TableData('Russell 1000', 6.0),
            TableData('S&P 500 Equal Weight', 4.3),
            TableData('DJIA Capped', 3.9),
            TableData('S&P 500 Real Estate', 3.9),
            TableData('BULL 100', 3.9)
]
    );


    const drawTable = () => {
        //TODO axios get every value
        //TODO set every value

        let spArray: number[] = [];
        let djiaArray: number[] = [];
        let russelArray: number[] = [];
        let spewArray: number[] = [];
        let djiacArray: number[] = [];
        let spreArray = [];
        let bullArray = [];

        axios.get("http://localhost:8080/Indices/S&P%20500")
            .then(res => {
                for (const dataObj of res.data.response) {
                    spArray.push(dataObj.Value);
                }
            })
            .catch(err => {
                    console.log(err);
            })

        axios.get("http://localhost:8080/Indices/DJIA")
            .then(res => {
                for (const dataObj of res.data.response) {
                    djiaArray.push(dataObj.Value);
                }
            })
            .catch(err => {
                console.log(err);
            })

        axios.get("http://localhost:8080/Indices/Russell%201000")
            .then(res => {
                for (const dataObj of res.data.response) {
                    russelArray.push(dataObj.Value);
                }
            })
            .catch(err => {
                console.log(err);
            })

        axios.get("http://localhost:8080/Indices/S&P%20500%20Equal%20Weight")
            .then(res => {
                for (const dataObj of res.data.response) {
                    spewArray.push(dataObj.Value);
                }
            })
            .catch(err => {
                console.log(err);
            })

        axios.get("http://localhost:8080/Indices/DJIA%20Capped")
            .then(res => {
                for (const dataObj of res.data.response) {
                    djiacArray.push(dataObj.Value);
                }
            })
            .catch(err => {
                console.log(err);
            })

        axios.get("http://localhost:8080/Indices/S&P%20500%20Real%20Estate")
            .then(res => {
                for (const dataObj of res.data.response) {
                    spreArray.push(dataObj.Value);
                }
            })
            .catch(err => {
                console.log(err);
            })

        axios.get("http://localhost:8080/Indices/BULL%20100")
            .then(res => {
                for (const dataObj of res.data.response) {
                    bullArray.push(dataObj.Value);
                }
            })
            .catch(err => {
                console.log(err);
            })

        setTableData([
            TableData('S&P 500', 4),
            TableData('DJIA', 4.3),
            TableData('Russell 1000', 6.0),
            TableData('S&P 500 Equal Weight', 4.3),
            TableData('DJIA Capped', 3.9),
            TableData('S&P 500 Real Estate', 3.9),
            TableData('BULL 100', 3.9)]);
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
            if (indexTitle == "S&P 500") {
                BaseURL = "http://localhost:8080/Indices/S&P%20500"
            } else if (indexTitle == "DJIA") {
                BaseURL = "http://localhost:8080/Indices/DJIA"
            } else if (indexTitle == "Russell 1000") {
                BaseURL = "http://localhost:8080/Indices/Russell%201000"
            } else if (indexTitle == "S&P 500 Equal Weight") {
                BaseURL = "http://localhost:8080/Indices/S&P%20500%20Equal%20Weight"
            } else if (indexTitle == "DJIA Capped") {
                BaseURL = "http://localhost:8080/Indices/DJIA%20Capped"
            } else if (indexTitle == "S&P 500 Real Estate") {
                BaseURL = "http://localhost:8080/Indices/S&P%20500%20Real%20Estate"
            } else if (indexTitle == "BULL 100") {
                BaseURL = "http://localhost:8080/Indices/BULL%20100"
            }
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
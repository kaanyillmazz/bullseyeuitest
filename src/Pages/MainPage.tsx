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

function MainPage() {
    let BaseURL = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=CARR,CTLT,CAT,CBOE,CBRE,CDW,CE,CNC,CNP,CDAY,CERN,CF,CRL,CHTR,CVX,CMG,CB,CHD,CI,CINF,CTAS,CSCO,C,CFG,CTXS,CLX,CME,CMS,CTSH,CL,CMCSA,CMA,CAG,COP,COO,CPRT,CTVA,COST,CTRA,CCI,CSX,CMI,CVS,CRM,DHI,DHR,DRI,DVA,DE,DAL,DVN,DXCM,DLR,DFS,DISCA,DISCK,DISH,DG,DLTR,D,DPZ,DOV,DOW,DTE,DUK,DRE,DD,DXC,DGX,DIS,ED,EMN,ETN,EBAY,ECL,EIX,EW,EA,EMR,ENPH,ETR,EOG,EFX,EQIX,EQR,ESS,EL,ETSY,EVRG,ES,EXC,EXPE,EXPD,EXR,FANG,FFIV,FB,FAST,FRT,FDX,FIS,FITB,FE,FRC,FISV,FLT,FMC,F,FTNT,FTV,FBHS,FOXA,FOX,FCX,GOOGL,GOOG,GLW,GPS,GRMN,GNRC,GD,GE,GIS,GM,GPC,GILD,GL,GPN,GS,GWW,HAL,HBI,HIG,HAS,HCA,HSIC,HSY,HES,HPE,HLT,HOLX,HD,HON,HRL,HST,HWM,HPQ,HUM,HBAN,HII,IT,IEX,IDXX,INFO,ITW,ILMN,INCY,IR,INTC,ICE,IBM,IP,IPG,IFF,INTU,ISRG,IVZ,IPGP,IQV,IRM,JKHY,J,JBHT,JNJ,JCI,JPM,JNPR,KMX,KO,KSU";
    let empSal: any = [];
    let empAge: any = [];

    const [userData, setUserData] = useState({
            labels: empSal,
            datasets: [
                {
                    label: "Index Values",
                    data: empAge,
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

    const Chart = () => {
        let empSal: any = [];
        let empAge: any = [];

        axios.get(BaseURL)
            .then(res => {
                for (const dataObj of res.data.quoteResponse.result) {
                    empSal.push(parseInt(dataObj.postMarketTime));
                    empAge.push(parseInt(dataObj.marketCap));
                }

                setUserData({
                    labels: empSal,
                    datasets: [
                        {
                            label: "Index Values",
                            data: empAge,
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
            BaseURL = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=ABT,AZO,AVB,AVY,AVGO,BKR,BLL,BAC,BBWI,BAX,BDX,BBY,BIO,BIIB,BLK,BK,BA,BKNG,BWA,BXP,BSX,BMY,BR,BRO,BEN,CHRW,CDNS,CZR,CPB,COF,CAH,CCL"
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
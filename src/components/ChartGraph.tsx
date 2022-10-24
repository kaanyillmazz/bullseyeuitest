import React, {useState, useEffect} from 'react'

import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import './ChartGraph.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const DynamicChart = (props: any) => {
    let title0 = "";
    title0 = props.title;





    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const [chartData, setChartData] = useState({
        labels,
        datasets: [
            {
                label: '',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                backgroundColor:
                    'rgb(9,1,2)',

                borderColor:
                    'rgb(9,1,2)',

                borderWidth: 1
            },
        ],
    });


    const Chart = () => {
        let yAxisData: any = [];
        let xAxisData: any = [];

        axios.get("https://query1.finance.yahoo.com/v7/finance/quote?symbols=ABT,AZO,AVB,AVY,AVGO,BKR,BLL,BAC,BBWI,BAX,BDX,BBY,BIO,BIIB,BLK,BK,BA,BKNG,BWA,BXP,IBM,IP,IPG,MMM,MO,MTB,MRO,MPC,MKTX,MAR,MMC,MLM,MAS,MA,MTCH,MKC,MCD,MCK,MDT,MRK,MET,MTD,MGM,MCHP,MU,MSFT,MAA,MRNA,MHK,MDLZ,MPWR,MNST,MCO,MS,MOS,MSI,MSCI,NDAQ,NTAP,NFLX,NWL,NEM,NWSA,NWS,NEE,NLSN,NKE,NI,NSC,NTRS,NOC,NLOK,NCLH,NRG,NUE,NVDA,NVR,NXPI,NOW,ORLY,OXY,ODFL,OMC,OKE,ORCL,OGN,OTIS,O,PEAK,PCAR,PKG,PH,PAYX,PAYC,PYPL,PENN,PNR,PBCT,PEP,PKI,PFE,PM,PSX,PNW,PXD,PNC,ROST,RCL,SCHW,STZ,SJM,SPGI,SBAC,SLB,STX,SEE,SRE,SHW,SPG,SWKS,SNA,SO,SWK,SBUX,STT,STE,SYK,SIVB,SYF,SNPS,SYY,T,TECH,TAP,TMUS,TROW,TTWO,TPR,TGT,TEL,TDY,TFX,TER,TSLA,TXN,TXT,TMO,TJX,TSCO,TT,TDG,TRV,TRMB,TFC,TWTR,TYL,TSN,UDR,ULTA,USB,UAA,UA,UNP,UAL,UNH,UPS,URI,UHS,VLO,VTR,VRSN,VRSK,VZ,VRTX,VFC,VIAC,VTRS,V,VNO,VMC,WRB,WAB,WMT,WBA,WM,WAT,WEC,WFC,WELL,WST,WDC,WU,WRK,WY,WHR,WMB,WLTW,WYNN,XRAY,XOM,XEL,XYL,YUM,ZBRA,ZBH,ZION,ZTS")
            .then(res => {

                for (const dataObj of res.data.quoteResponse.result) {
                    yAxisData.push(parseInt(dataObj.regularMarketPrice));
                    xAxisData.push(parseInt(dataObj.marketCap));

                }
                setChartData({
                    labels: xAxisData,
                    datasets: [{
                        label: 'index value',
                        data: yAxisData,
                        backgroundColor:
                            'rgba(0,0,0,0.2)',

                        borderColor:
                            'rgb(16,2,2)',

                        borderWidth: 1
                    }]
                });
            })
            .catch(err => {
                console.log(err);
            })

    }
        Chart();





    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title0,
            },
        },
    };


    return (
        <div className="chartArea">
            <Line options={options} data={chartData}/>
        </div>
    )
}
export default DynamicChart;
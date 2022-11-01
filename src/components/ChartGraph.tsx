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


const data = {
    labels: ["21:00", "20:00", "19:00", "18:00", "17:00", "16:00", "15:00", "14:00","13:00", "12:00", "11:00", "10:00", "9:00"],
    datasets: [
        {
            label: "S&P 500",
            data: [3896.25, 3890.25, 3880.25, 3876.25, 3860.60, 3855.50,3870.25, 3990.20, 3870.90, 3860.25, 3850.60, 3855.50,3850.50 ],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
        },
        {
            label: "DOW",
            data: [3596.25, 3490.25, 3780.25, 3476.25, 3060.60, 3155.50,3270.25, 3390.20, 3670.90, 3160.25, 3350.60, 3455.50,3550.50 ],
            fill: false,
            borderColor: "#742774"
        }
    ]
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: "lmao",
        },
        zoom: {
            enabled: true,
            mode: "xy"
        },
        pan: {
            enabled: true,
            mode: "xy"
        },
    },
};

export default function ChartGraph(props: any) {
    return (
        <div className="chartArea">
            <Line options={options} data={data} />
        </div>
    );
}

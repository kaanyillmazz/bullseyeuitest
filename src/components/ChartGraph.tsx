import React, {useState, useEffect} from 'react'
import axios from 'axios';

import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";


const data = [
    {
        "name": "Sunday",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Saturday",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Friday",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Thursday",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Wed",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Tuesday",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Monday",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    },
    {
        "name": "Sunday",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Saturday",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Friday",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Thursday",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Wed",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Tuesday",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Monday",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }

]

function ChartGraph(props: any) {


    return (
        <LineChart width={1000} height={500} data={data}
                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8"/>
        </LineChart>

    );
}


export default ChartGraph;
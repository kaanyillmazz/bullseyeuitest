import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setName} from "../features/indexNameSlice";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('S&P', 159, 6.0, 24, 4.0),
    createData('Dow Jones Industrial Average', 237, 9.0, 37, 4.3),
    createData('Russell 2000', 262, 16.0, 24, 6.0),
    createData('Nasdaq Composite', 305, 3.7, 67, 4.3),
    createData('NYSE Arca Oil Index', 356, 16.0, 49, 3.9),
];



export default function DataTable() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const navigator = (indexTitle: string) => {
        navigate(`/index/${indexTitle}`, {replace: false});
    }

    const indexSetter = (indexTitle: string) => {
      dispatch(setName(indexTitle));
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Symbol</TableCell>
                        <TableCell align="right">Current Index</TableCell>
                        <TableCell align="right">Daily Change</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell onClick={()=>{indexSetter(row.name)}} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
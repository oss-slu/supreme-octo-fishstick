import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

export default function RationalTwistsTable() {
    // Placeholder data
    const placeholderData = [
        { label: "Twist-1", standardModel: "x^2 + y^2" },
        { label: "Twist-2", standardModel: "x^3 + y^3" },
        { label: "Twist-3", standardModel: "x^4 + y^4" },
    ];

    return (
        <TableContainer className='table-component' component={Paper}>
            <h3>Rational Twists</h3>
            <Table aria-label="rational twists table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"><b>Label</b></TableCell>
                        <TableCell align="left"><b>Standard Model</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {placeholderData.map((twist, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">
                                <Link to={`/twist-details/${twist.label}`}>{twist.label}</Link>
                            </TableCell>
                            <TableCell align="left">{twist.standardModel}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

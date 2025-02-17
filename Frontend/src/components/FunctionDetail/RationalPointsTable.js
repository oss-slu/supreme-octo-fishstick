import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdjacencyMatrix from '../FunctionDetail/AdjacencyMatrix';
import Copy from '../FunctionDetail/Copy';
import { styled } from '@mui/material/styles';

const ScrollableTableContainer = styled(TableContainer)({
  maxHeight: '400px', // Adjust height as needed
  overflowY: 'auto'
});

export default function RationalPointsTable({ data }) {
  console.log('rational pre data', data);

  const formatData = (key) => {
    const items = data[key];
    if (items && items.length > 0) {
      if (Array.isArray(items[0])) {
        return `[${items[0].join(', ')}]`;
      } else {
        return `[${items.join(', ')}]`;
      }
    }
    return '[]';
  };

  return (
    <>
        <h3>Rational Preperiodic Points</h3>
      <ScrollableTableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row"><b>Cardinality</b></TableCell>
              <TableCell align="right">{data.cardinality}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"><b>Field Label</b></TableCell>
              <TableCell align="right">{data.base_field_label}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"><b>Preperiodic Components</b></TableCell>
              <TableCell align="right">{formatData('preperiodic_components')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"><b>Rational Preperiodic Points</b></TableCell>
              <TableCell align="right">{formatData('rational_periodic_points')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"><b>As Directed Graph</b></TableCell>
              <TableCell align="right">
                <Copy edges={formatData("edges")} type={2} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"><b>Adjacency Matrix</b></TableCell>
              <TableCell align="right">
                <Copy edges={formatData("edges")} type={1} />
                <br />
                <AdjacencyMatrix modalTitle={"Adjacency Matrix"} edges={formatData("edges")} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollableTableContainer>
    </>
  );
}
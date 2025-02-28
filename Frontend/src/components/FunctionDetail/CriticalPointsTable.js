import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HelpBox from '../FunctionDetail/HelpBox'

export default function CriticalPointsTable({ data }) {
  return (
    <TableContainer className='table-component' component={Paper}>
      <h3>Critical Points</h3>
      <h6>Information about the critical points of this map</h6>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              <b>Postcritically Finite?</b>
              <HelpBox description="True if the map is postcritically finite, i.e., if every critical point is preperiodic" title="Postcritically Finite?" />
            </TableCell>
            <TableCell align="right">{String(data.is_pcf)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <b>Critical Points Cardinality</b>
              <HelpBox description="The number of critical points" title="Critical Points Cardinality" />
            </TableCell>
            <TableCell align="right">{data.cp_cardinality || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <b>Field of Definition</b>
              <HelpBox description="The smallest field containing all of the critical points." title="Field of Definition" />
            </TableCell>
            <TableCell align="right">{data.cp_field_of_defn || "N/A"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

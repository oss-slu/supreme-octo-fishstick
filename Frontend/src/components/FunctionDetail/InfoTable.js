import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { processInput, renderExponent, splitOutermostCommas } from './ModelsTable';
import HelpBox from '../FunctionDetail/HelpBox'


export default function InfoTable({ data }) {
  const navigate = useNavigate();

  const handleLinkClick = (selection) => {
    navigate(`/family-details/${selection}`);
  };
  
  const standard_model = data.display_model;
  let polynomial;
  let modelKey;
  if (!standard_model) {
    modelKey= null;
    polynomial = null;
  }
  else if (standard_model==="monic centered"){
    modelKey= "monic_centered";
    polynomial = data.monic_centered;
  }

  else if (standard_model==="chebyshev"){
    modelKey= "original_model" // I see that polynomial of chebysev is similar in all models
    polynomial = data.original_model;
  }

  else {
    modelKey= `{standard_model}_model`; // I see in the display_model, there're only monic_centered, chebysev, and reduced
    // I do this just in case in the future we have more models
    polynomial= data[`${standard_model}_model`];
  }

  let polynomialExpression;
  if (polynomial) {
    const modelData= splitOutermostCommas(polynomial);
    polynomialExpression= renderExponent(processInput(modelData[0]));
  }
  console.log("Standard Model Name:", standard_model);
  console.log("Model Key Used:", modelKey);
  console.log("Polynomial Data Found:", polynomial);


  return (
    <TableContainer className='table-component' component={Paper}>
      <h3>Function Details</h3>
      <h6>Basic data identifying this conjugacy class of dynamical systems.</h6>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Label</b><HelpBox description="A unique identifier of the form N.S1.S2.M where N is the dimension of the domain, S1 is a hash of the sigma invariants of the fixed points, S2 is a hash of the sigma invariants of the points of period 2, and M is an ordinal to ensure uniqueness. For Lattes maps, the label is N.(LMFDB label).degree.M" title="Label" /></TableCell>
            <TableCell align="right"><b>Domain</b><HelpBox description="The ambient domain of the map; a project space" title="Domain" /></TableCell>
            <TableCell align="right"><b>Standard Model</b><HelpBox description="The typical representative polynomials of this conjugacy class." title="Standard Model" /></TableCell>
            <TableCell align="right"><b>Degree</b><HelpBox description="Degree of the homogeneous polynomials of a representative of this map." title="Degree" /></TableCell>
            <TableCell align="right"><b>Field of Definition</b><HelpBox description="The smallest field containing all coefficients of the standard representative polynomials." title="Field of Definition" /></TableCell>
            <TableCell align="right"><b>Family</b><HelpBox description="Identifier for families of maps this conjugacy class belongs to (e.g. degree 2 polynomials)." title="Family" /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">{data.modelLabel}</TableCell>
            <TableCell align="right">{data.base_field_label}</TableCell>
            <TableCell align="right">{polynomialExpression}</TableCell>
            <TableCell align="right">{data.degree}</TableCell>
            <TableCell align="right">
            <a
                href={`https://www.lmfdb.org/NumberField/${data.base_field_label}`}
                style={{ color: "blue", textDecoration: "underline" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.base_field_label}
              </a>
            </TableCell>
            <TableCell align="right">
              {data.family && (
                <button
                  onClick={() => handleLinkClick(data.family)}
                  style={{
                    border: "None",
                    color: "red",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    cursor: "pointer"
                  }}
                >
                  {data.family}
                </button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdjacencyMatrix from '../FunctionDetail/AdjacencyMatrix'
import Copy from '../FunctionDetail/Copy'
import HelpBox from '../FunctionDetail/HelpBox'

export default function RationalPointsTable({ data }) {
	console.log('rational pre data',data)
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
			<TableContainer className='table-component' component={Paper}>
				<h3>Rational Preperiodic Points</h3>
				<h6>Information on the rational preperiodic points over different fields.</h6>
				<Table aria-label="simple table">
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row"><b>Cardinality</b><HelpBox description="The number of rational preperiodic points." title="Cardinality" /></TableCell>
							<TableCell align="right">{data.cardinality}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row"><b>Field Label</b><HelpBox description="The field of definition of the points considered." title="Field Label" /></TableCell>
							<TableCell align="right">{data.base_field_label}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row"><b>Preperiodic Components</b><HelpBox description="The number of preperiodic components in the graph whose vertices are the preperiodic points and whose edges connect x to f(x)." title="Preperiodic Components" /></TableCell>
							<TableCell align="right">{formatData('preperiodic_components')}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row"><b>Rational Preperiodic Points</b><HelpBox description="A single preperiodic point in each of the preperiodic components." title="Rational Preperiodic Points" /></TableCell>
							<TableCell align="right">{formatData('rational_periodic_points')}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row"><b>As Directed Graph</b><HelpBox description="The DiGraph object of rational preperiodic points as created by SageMath." title="As Directed Graph" /></TableCell>
							<TableCell align="right">
								<Copy edges={formatData("edges")} type={2} />
							</TableCell>
								
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row"><b>Adjacency Matrix</b><HelpBox description="An adjacency matric representing the preperiodic point DiGraph." title="Adjancency Matrix" /></TableCell>
							<TableCell align="right">
								<Copy edges={formatData("edges")} type={1} />
								<br>
								</br>
								<AdjacencyMatrix modalTitle={"Adjacency Matrix"} edges={formatData("edges")} />
								
							</TableCell>
							
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

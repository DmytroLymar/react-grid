import './App.css';
import { Paper } from '@mui/material';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { generateRows, globalSalesValues } from './demo-data/generator';
import { useState } from 'react';
import { TableRow } from './components/TableRow';
import { TableCell } from './components/TableCell';

function App() {
    const [columns] = useState([
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' }
    ]);
    const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));
    return (
        <Paper>
            <Grid rows={rows} columns={columns}>
                <Table rowComponent={TableRow} cellComponent={TableCell} />
                <TableHeaderRow />
            </Grid>
        </Paper>
    );
}

export default App;

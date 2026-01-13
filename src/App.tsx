import './App.css';
import { Paper } from '@mui/material';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { generateRows, globalSalesValues } from './demo-data/generator';
import { useState } from 'react';
import { TableRow } from './components/TableRow';
import { CurrencyTypeProvider, DateTypeProvider } from './components/Formaters';

function App() {
    const [columns] = useState([
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'amount', title: 'Sale Amount' }
    ]);
    const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));
    const [dateColumns] = useState(['saleDate']);
    const [currencyColumns] = useState(['amount']);

    return (
        <Paper>
            <Grid rows={rows} columns={columns}>
                <CurrencyTypeProvider for={currencyColumns} />
                <DateTypeProvider for={dateColumns} />
                <Table rowComponent={TableRow} />
                <TableHeaderRow />
            </Grid>
        </Paper>
    );
}

export default App;

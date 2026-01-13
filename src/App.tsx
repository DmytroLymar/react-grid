import './App.css';
import { Paper } from '@mui/material';
import {
    Grid,
    GroupingPanel,
    Table,
    TableGroupRow,
    TableHeaderRow,
    Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { generateRows, globalSalesValues } from './demo-data/generator';
import { useState } from 'react';
import { TableRow } from './components/TableRow';
import { CurrencyTypeProvider, DateTypeProvider } from './components/Formaters';
import {
    GroupingState,
    IntegratedGrouping,
    IntegratedSorting,
    SortingState,
    type Grouping,
    type Sorting
} from '@devexpress/dx-react-grid';

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
    const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'amount', direction: 'asc' }]);
    const [grouping, setGrouping] = useState<Grouping[]>([{ columnName: 'product' }]);

    return (
        <Paper>
            <Grid rows={rows} columns={columns}>
                <CurrencyTypeProvider for={currencyColumns} />
                <DateTypeProvider for={dateColumns} />

                <SortingState sorting={sorting} onSortingChange={setSorting} />
                <GroupingState grouping={grouping} onGroupingChange={setGrouping} />

                <IntegratedSorting />
                <IntegratedGrouping />

                <Table rowComponent={TableRow} />
                <TableHeaderRow showSortingControls showGroupingControls />

                <TableGroupRow />
                <Toolbar />
                <GroupingPanel showGroupingControls />
            </Grid>
        </Paper>
    );
}

export default App;

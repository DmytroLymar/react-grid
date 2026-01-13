import './App.css';
import { Paper } from '@mui/material';
import {
    Grid,
    GroupingPanel,
    PagingPanel,
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
    IntegratedPaging,
    IntegratedSorting,
    PagingState,
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
    const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 24 }));
    const [dateColumns] = useState(['saleDate']);
    const [currencyColumns] = useState(['amount']);
    const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'amount', direction: 'asc' }]);
    const [grouping, setGrouping] = useState<Grouping[]>([{ columnName: 'product' }]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizes] = useState([5, 10, 15, 0]);

    return (
        <Paper>
            <Grid rows={rows} columns={columns}>
                <CurrencyTypeProvider for={currencyColumns} />
                <DateTypeProvider for={dateColumns} />

                <SortingState sorting={sorting} onSortingChange={setSorting} />
                <GroupingState grouping={grouping} onGroupingChange={setGrouping} />
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />

                <IntegratedSorting />
                <IntegratedGrouping />
                <IntegratedPaging />

                <Table rowComponent={TableRow} />
                <TableHeaderRow showSortingControls showGroupingControls />

                <PagingPanel pageSizes={pageSizes} />

                <TableGroupRow />
                <Toolbar />
                <GroupingPanel showGroupingControls />
            </Grid>
        </Paper>
    );
}

export default App;

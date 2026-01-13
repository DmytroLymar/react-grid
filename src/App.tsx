import './App.css';
import { Paper } from '@mui/material';
import {
    DragDropProvider,
    Grid,
    GroupingPanel,
    PagingPanel,
    SearchPanel,
    Table,
    TableFilterRow,
    TableGroupRow,
    TableHeaderRow,
    TableSelection,
    Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { generateRows, globalSalesValues } from './demo-data/generator';
import { useState } from 'react';
import { TableRow } from './components/TableRow';
import { CurrencyTypeProvider, DateTypeProvider } from './components/Formaters';
import {
    FilteringState,
    GroupingState,
    IntegratedFiltering,
    IntegratedGrouping,
    IntegratedPaging,
    IntegratedSelection,
    IntegratedSorting,
    PagingState,
    SearchState,
    SelectionState,
    SortingState,
    type Filter,
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
    const [grouping, setGrouping] = useState<Grouping[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizes] = useState([5, 10, 15, 0]);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [searchValue, setSearchState] = useState('');
    const [selection, setSelection] = useState<(string | number)[]>([]);

    return (
        <div>
            <Paper>
                <Grid rows={rows} columns={columns}>
                    <CurrencyTypeProvider for={currencyColumns} />
                    <DateTypeProvider for={dateColumns} />

                    <DragDropProvider />

                    <SearchState value={searchValue} onValueChange={setSearchState} />
                    <SortingState sorting={sorting} onSortingChange={setSorting} />
                    <GroupingState grouping={grouping} onGroupingChange={setGrouping} />
                    <FilteringState filters={filters} onFiltersChange={setFilters} />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={setCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                    />
                    <SelectionState selection={selection} onSelectionChange={setSelection} />

                    <IntegratedSorting />
                    <IntegratedGrouping />
                    <IntegratedFiltering />
                    <IntegratedPaging />
                    <IntegratedSelection />

                    <Table rowComponent={TableRow} />
                    <TableHeaderRow showSortingControls showGroupingControls />
                    <TableFilterRow />
                    <TableSelection />
                    <TableGroupRow />

                    <Toolbar />
                    <SearchPanel />
                    <GroupingPanel showGroupingControls />
                    <PagingPanel pageSizes={pageSizes} />
                </Grid>
            </Paper>
            <span>Total rows selected: {selection.length}</span>
        </div>
    );
}

export default App;

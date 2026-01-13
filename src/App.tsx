import './App.css';
import { Paper } from '@mui/material';
import {
    DragDropProvider,
    Grid,
    GroupingPanel,
    PagingPanel,
    SearchPanel,
    Table,
    TableEditColumn,
    TableEditRow,
    TableFilterRow,
    TableGroupRow,
    TableHeaderRow,
    TableSelection,
    Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { generateRows, globalSalesValues } from './demo-data/generator';
import { useCallback, useState } from 'react';
import { TableRow } from './components/TableRow';
import { CurrencyTypeProvider, DateTypeProvider } from './components/Formaters';
import {
    EditingState,
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
    type ChangeSet,
    type Filter,
    type Grouping,
    type Row,
    type RowId,
    type Sorting
} from '@devexpress/dx-react-grid';

const getRowId = (row: Row): RowId => row.id;

function App() {
    const [columns] = useState([
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'amount', title: 'Sale Amount' }
    ]);
    const [rows, setRows] = useState<Row[]>(
        generateRows({
            columnValues: { id: ({ index }: { index: number }) => index, ...globalSalesValues },
            length: 24
        }) as Row[]
    );
    const [dateColumns] = useState<string[]>(['saleDate']);
    const [currencyColumns] = useState<string[]>(['amount']);

    const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'amount', direction: 'asc' }]);
    const [grouping, setGrouping] = useState<Grouping[]>([]);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [searchValue, setSearchState] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageSizes] = useState<number[]>([5, 10, 15, 0]);

    const [selection, setSelection] = useState<(string | number)[]>([]);

    const commitChanges = useCallback(
        ({ added, changed, deleted }: ChangeSet) => {
            setRows((prevRows) => {
                let nextRows = prevRows;

                if (added && added.length) {
                    const lastId = prevRows.length ? prevRows[prevRows.length - 1].id : -1;
                    const startingAddedId = lastId + 1;

                    nextRows = [
                        ...prevRows,
                        ...(added as Array<Partial<Row>>).map((row, index) => ({
                            id: startingAddedId + index,
                            ...row
                        }))
                    ];
                }

                if (changed) {
                    nextRows = nextRows.map((row) => {
                        const change = (changed as Record<RowId, Partial<Row>>)[row.id];
                        return change ? { ...row, ...change } : row;
                    });
                }

                if (deleted && deleted.length) {
                    const deletedSet = new Set(deleted as RowId[]);
                    nextRows = nextRows.filter((row) => !deletedSet.has(row.id));
                }

                return nextRows;
            });
        },
        [setRows]
    );

    return (
        <div>
            <Paper>
                <Grid rows={rows} columns={columns} getRowId={getRowId}>
                    <CurrencyTypeProvider for={currencyColumns} />
                    <DateTypeProvider for={dateColumns} />

                    <DragDropProvider />

                    <SearchState value={searchValue} onValueChange={setSearchState} />
                    <SortingState sorting={sorting} onSortingChange={setSorting} />
                    <GroupingState grouping={grouping} onGroupingChange={setGrouping} />
                    <FilteringState filters={filters} onFiltersChange={setFilters} />
                    <EditingState onCommitChanges={commitChanges} />

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
                    <TableEditRow />
                    <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
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

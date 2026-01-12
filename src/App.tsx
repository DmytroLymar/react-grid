import './App.css';
import { Paper } from '@mui/material';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

function App() {
    const columns = [
        { name: 'id', title: 'ID' },
        { name: 'product', title: 'Product' },
        { name: 'owner', title: 'Owner' }
    ];
    const rows = [
        { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
        { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' }
    ];
    return (
        <Paper>
            <Grid rows={rows} columns={columns}>
                <Table />
                <TableHeaderRow />
            </Grid>
        </Paper>
    );
}

export default App;

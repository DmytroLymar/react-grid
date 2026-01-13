import type * as React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';

type DataCellProps = React.ComponentProps<typeof Table.Cell>;

export const HighlightedCell: React.FC<DataCellProps> = ({ value, style, ...restProps }) => (
    <Table.Cell
        {...restProps}
        value={value}
        style={{
            ...(style ?? {}),
            backgroundColor: typeof value === 'number' && value < 5000 ? 'red' : undefined
        }}
    >
        <span style={{ color: typeof value === 'number' && value < 5000 ? 'white' : undefined }}>{String(value)}</span>
    </Table.Cell>
);

export const TableCell: React.FC<DataCellProps> = (props) => {
    const { column } = props;

    if (column.name === 'amount') {
        return <HighlightedCell {...props} />;
    }

    return <Table.Cell {...props} />;
};

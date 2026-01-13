import type * as React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

type FormatterProps<T> = { value: T };
type DTPProps = React.ComponentProps<typeof DataTypeProvider>;

const CurrencyFormatter: React.FC<FormatterProps<number>> = ({ value }) => (
    <b style={{ color: 'darkblue' }}>{value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</b>
);

export const CurrencyTypeProvider: React.FC<DTPProps> = (props) => (
    <DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />
);

const DateFormatter: React.FC<FormatterProps<string>> = ({ value }) =>
    value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');

export const DateTypeProvider: React.FC<DTPProps> = (props) => (
    <DataTypeProvider formatterComponent={DateFormatter} {...props} />
);

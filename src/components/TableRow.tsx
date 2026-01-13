import { Table } from '@devexpress/dx-react-grid-material-ui';

type DataRowProps = React.ComponentProps<typeof Table.Row>;

type SectorKey = 'banking' | 'health' | 'telecom' | 'energy' | 'insurance';

const styles: Record<SectorKey, React.CSSProperties> = {
    banking: { backgroundColor: '#f5f5f5' },
    health: { backgroundColor: '#a2e2a4' },
    telecom: { backgroundColor: '#b3e5fc' },
    energy: { backgroundColor: '#ffcdd2' },
    insurance: { backgroundColor: '#f0f4c3' }
};

const isSectorKey = (v: string): v is SectorKey =>
    (['banking', 'health', 'telecom', 'energy', 'insurance'] as const).includes(v as SectorKey);

export const TableRow: React.FC<DataRowProps> = ({ row, ...restProps }) => {
    const sector = row.sector.toLowerCase();
    const sectorStyle = isSectorKey(sector) ? styles[sector] : undefined;

    return (
        <Table.Row
            {...restProps}
            row={row}
            style={{
                ...(restProps.style ?? {}),
                ...(sectorStyle ?? {})
            }}
        />
    );
};

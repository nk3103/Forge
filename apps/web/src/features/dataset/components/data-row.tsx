import { DataCell } from "./data-cell";

interface DataRowProps {
  columns: string[];
  row: Record<string, unknown>;
}

export function DataRow({
  columns,
  row,
}: DataRowProps) {
  return (
    <tr className="border-b hover:bg-muted/40">
      {columns.map((column) => (
        <DataCell
          key={column}
          value={row[column]}
        />
      ))}
    </tr>
  );
}
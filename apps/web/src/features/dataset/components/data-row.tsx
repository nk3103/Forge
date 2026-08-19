import type { DiffIndex } from "../diff/create-diff-index";

import { DataCell } from "./data-cell";

interface DataRowProps {
  rowIndex: number;
  columns: string[];
  row: Record<string, unknown>;
  diffIndex?: DiffIndex;
}

export function DataRow({
  rowIndex,
  columns,
  row,
  diffIndex,
}: DataRowProps) {
  return (
    <tr className="border-b hover:bg-muted/40">
      {columns.map((column) => (
        <DataCell
          key={column}
          value={row[column]}
          rowIndex={rowIndex}
          column={column}
          diffIndex={diffIndex}
        />
      ))}
    </tr>
  );
}
import { cn } from "@/lib/utils";

import type { DiffIndex } from "../diff/create-diff-index";

interface DataCellProps {
  value: unknown;
  rowIndex: number;
  column: string;
  diffIndex?: DiffIndex;
}

export function DataCell({
  value,
  rowIndex,
  column,
  diffIndex,
}: DataCellProps) {
  const changed =
    diffIndex?.changedCells.has(
      `${rowIndex}:${column}`,
    ) ?? false;

  return (
    <td
      className={cn(
        "px-4 py-3 transition-colors",
        changed &&
          "bg-green-100 font-medium",
      )}
    >
      {String(value ?? "")}
    </td>
  );
}
import { cn } from "@/lib/utils";

import type { DiffIndex } from "../diff/create-diff-index";

interface DataHeaderCellProps {
  column: string;
  diffIndex?: DiffIndex;
}

export function DataHeaderCell({
  column,
  diffIndex,
}: DataHeaderCellProps) {
  const renamed =
    diffIndex?.renamedColumns.has(column) ??
    false;

  return (
    <th
      className={cn(
        "border-b px-4 py-3 text-left font-medium transition-colors",
        renamed &&
          "bg-green-100",
      )}
    >
      {column}
    </th>
  );
}
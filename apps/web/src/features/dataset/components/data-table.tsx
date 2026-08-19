import type { DiffIndex } from "../diff/create-diff-index";
import type { Dataset } from "../types";

import { DataHeaderCell } from "./data-header-cell";
import { DataRow } from "./data-row";

interface DataTableProps {
  dataset: Dataset;
  diffIndex?: DiffIndex;
}

export function DataTable({
  dataset,
  diffIndex,
}: DataTableProps) {
  return (
    <div className="overflow-auto rounded-xl border">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 bg-muted">
          <tr>
            {dataset.columns.map((column) => (
              <DataHeaderCell
                key={column}
                column={column}
                diffIndex={diffIndex}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {dataset.rows.map((row, index) => (
            <DataRow
              key={index}
              rowIndex={index}
              columns={dataset.columns}
              row={row}
              diffIndex={diffIndex}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
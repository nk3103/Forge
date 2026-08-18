import type { Dataset } from "../types";

import { DataRow } from "./data-row";

interface DataTableProps {
  dataset: Dataset;
}

export function DataTable({
  dataset,
}: DataTableProps) {
  return (
    <div className="overflow-auto rounded-xl border">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 bg-muted">
          <tr>
            {dataset.columns.map((column) => (
              <th
                key={column}
                className="border-b px-4 py-3 text-left font-medium"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dataset.rows.map((row, index) => (
            <DataRow
              key={index}
              columns={dataset.columns}
              row={row}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
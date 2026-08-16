import type { Dataset } from "../types";

interface DataTableProps {
  dataset: Dataset;
}

export function DataTable({ dataset }: DataTableProps) {
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
            <tr
              key={index}
              className="border-b hover:bg-muted/40"
            >
              {dataset.columns.map((column) => (
                <td
                  key={column}
                  className="px-4 py-3"
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
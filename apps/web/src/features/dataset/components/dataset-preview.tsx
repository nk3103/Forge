"use client";

import type { Dataset } from "../types";

interface DatasetPreviewProps {
  dataset: Dataset;
}

export function DatasetPreview({
  dataset,
}: DatasetPreviewProps) {
  return (
    <div className="space-y-4 rounded-xl border p-6">
      <div>
        <h2 className="text-xl font-semibold">
          {dataset.name}
        </h2>

        <p className="text-muted-foreground">
          {dataset.rows.length} rows • {dataset.columns.length} columns
        </p>
      </div>

      <div className="overflow-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              {dataset.columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left font-medium"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dataset.rows
              .slice(0, 5)
              .map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b last:border-0"
                >
                  {dataset.columns.map((column) => (
                    <td
                      key={column}
                      className="px-4 py-3"
                    >
                      {String(
                        row[column] ?? "",
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import type { Dataset } from "@/features/dataset/types";

import type { ConcatenateColumnsOperation } from "../operation-types";

export function applyConcatenateColumns(
  dataset: Dataset,
  operation: ConcatenateColumnsOperation,
): Dataset {
  const { columns, separator, destination } = operation.payload;
  const nextColumns = dataset.columns.includes(destination)
    ? dataset.columns
    : [...dataset.columns, destination];

  return {
    ...dataset,
    columns: nextColumns,
    rows: dataset.rows.map((row) => ({
      ...row,
      [destination]: columns
        .map((column) => {
          const value = row[column];

          return value === null || value === undefined
            ? ""
            : String(value);
        })
        .join(separator),
    })),
  };
}
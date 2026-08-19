import type { Dataset } from "@/features/dataset/types";

import type { SplitColumnOperation } from "../operation-types";

export function applySplitColumn(
  dataset: Dataset,
  operation: SplitColumnOperation,
): Dataset {
  const { column, separator, destinations } = operation.payload;
  const nextColumns = [...dataset.columns];

  for (const destination of destinations) {
    if (!nextColumns.includes(destination)) {
      nextColumns.push(destination);
    }
  }

  return {
    ...dataset,
    columns: nextColumns,
    rows: dataset.rows.map((row) => {
      const value = row[column];
      const parts =
        typeof value === "string"
          ? value.split(separator)
          : [
              value === null || value === undefined
                ? ""
                : String(value),
            ];
      const nextRow = { ...row };

      destinations.forEach((destination, index) => {
        nextRow[destination] = parts[index] ?? "";
      });

      return nextRow;
    }),
  };
}
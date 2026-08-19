import type { Dataset } from "@/features/dataset/types";

import type { RemoveEmptyRowsOperation } from "../operation-types";

export function applyRemoveEmptyRows(
  dataset: Dataset,
  _operation?: RemoveEmptyRowsOperation,
): Dataset {
  void _operation;

  return {
    ...dataset,
    rows: dataset.rows.filter((row) =>
      dataset.columns.some((column) => {
        const value = row[column];

        return (
          value !== null &&
          value !== undefined &&
          value !== ""
        );
      }),
    ),
  };
}
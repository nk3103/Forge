import type { Dataset } from "@/features/dataset/types";

import type { FillMissingValuesOperation } from "../operation-types";

export function applyFillMissingValues(
  dataset: Dataset,
  operation: FillMissingValuesOperation,
): Dataset {
  return {
    ...dataset,
    rows: dataset.rows.map((row) => {
      const currentValue = row[operation.payload.column];

      const isMissing =
        currentValue === null ||
        currentValue === undefined ||
        currentValue === "";

      return {
        ...row,
        [operation.payload.column]: isMissing
          ? operation.payload.value
          : currentValue,
      };
    }),
  };
}
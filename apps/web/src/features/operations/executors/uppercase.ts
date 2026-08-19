import type { Dataset } from "@/features/dataset/types";

import type { UppercaseOperation } from "../operation-types";

export function applyUppercase(
  dataset: Dataset,
  operation: UppercaseOperation,
): Dataset {
  return {
    ...dataset,
    rows: dataset.rows.map((row) => {
      const value = row[operation.payload.column];

      return {
        ...row,
        [operation.payload.column]:
          typeof value === "string"
            ? value.toUpperCase()
            : value,
      };
    }),
  };
}
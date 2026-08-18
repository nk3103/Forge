import type { Dataset } from "@/features/dataset/types";

import type { TrimWhitespaceOperation } from "../operation-types";

export function applyTrimWhitespace(
  dataset: Dataset,
  operation: TrimWhitespaceOperation,
): Dataset {
  return {
    ...dataset,

    rows: dataset.rows.map((row) => {
      const value = row[operation.payload.column];

      return {
        ...row,

        [operation.payload.column]:
          typeof value === "string"
            ? value.trim()
            : value,
      };
    }),
  };
}
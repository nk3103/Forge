import type { Dataset } from "@/features/dataset/types";

import type { ReplaceTextOperation } from "../operation-types";

export function applyReplaceText(
  dataset: Dataset,
  operation: ReplaceTextOperation,
): Dataset {
  return {
    ...dataset,
    rows: dataset.rows.map((row) => {
      const value = row[operation.payload.column];

      return {
        ...row,
        [operation.payload.column]:
          typeof value === "string"
            ? value.replaceAll(
                operation.payload.find,
                operation.payload.replace,
              )
            : value,
      };
    }),
  };
}
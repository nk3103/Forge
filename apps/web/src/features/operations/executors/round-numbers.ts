import type { Dataset } from "@/features/dataset/types";

import type { RoundNumbersOperation } from "../operation-types";

export function applyRoundNumbers(
  dataset: Dataset,
  operation: RoundNumbersOperation,
): Dataset {
  const { column, decimals } = operation.payload;

  return {
    ...dataset,
    rows: dataset.rows.map((row) => {
      const value = row[column];

      return {
        ...row,
        [column]:
          typeof value === "number"
            ? Number(value.toFixed(decimals))
            : value,
      };
    }),
  };
}
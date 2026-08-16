import type { Dataset } from "@/features/dataset/types";
import type { RenameColumnOperation } from "../operation-types";

export function applyRenameColumn(
  dataset: Dataset,
  operation: RenameColumnOperation,
): Dataset {
  const { from, to } = operation.payload;

  return {
    ...dataset,

    columns: dataset.columns.map((column) =>
      column === from ? to : column,
    ),

    rows: dataset.rows.map((row) => {
      const updatedRow = { ...row };

      if (from in updatedRow) {
        updatedRow[to] = updatedRow[from];
        delete updatedRow[from];
      }

      return updatedRow;
    }),
  };
}
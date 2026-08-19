import type { Dataset } from "@/features/dataset/types";
import type { DeleteColumnOperation } from "../operation-types";

export function applyDeleteColumn(
  dataset: Dataset,
  operation: DeleteColumnOperation,
): Dataset {
  const columns = dataset.columns.filter(
    (column) =>
      column !== operation.payload.column,
  );

  const rows = dataset.rows.map((row) => {
    const nextRow = { ...row };

    delete nextRow[
      operation.payload.column
    ];

    return nextRow;
  });

  return {
    ...dataset,
    columns,
    rows,
  };
}
import type { Dataset } from "../types";
import type {
  CellUpdateChange,
  DatasetDiff,
  RenameColumnChange,
} from "./dataset-diff";

export function createDatasetDiff(
  before: Dataset,
  after: Dataset,
): DatasetDiff {
  const renamedColumns: RenameColumnChange[] = [];
  const modifiedCells: CellUpdateChange[] = [];

  before.columns.forEach((column, index) => {
    const nextColumn = after.columns[index];

    if (column !== nextColumn) {
      renamedColumns.push({
        type: "rename_column",
        from: column,
        to: nextColumn,
      });
    }
  });

  before.rows.forEach((beforeRow, rowIndex) => {
    const afterRow = after.rows[rowIndex];

    if (!afterRow) {
      return;
    }

    before.columns.forEach((beforeColumn, columnIndex) => {
      const afterColumn = after.columns[columnIndex];

      const beforeValue =
        beforeRow[beforeColumn];

      const afterValue =
        afterRow[afterColumn];

      if (beforeValue !== afterValue) {
        modifiedCells.push({
          type: "cell_update",
          rowIndex,
          column: afterColumn,
          before: beforeValue,
          after: afterValue,
        });
      }
    });
  });

  return {
    summary: {
      renamedColumns:
        renamedColumns.length,
      modifiedCells:
        modifiedCells.length,
    },

    changes: [
      ...renamedColumns,
      ...modifiedCells,
    ],
  };
}
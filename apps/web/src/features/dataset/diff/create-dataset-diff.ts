import type { Dataset } from "../types";
import type {
  CellUpdateChange,
  DeleteColumnChange,
  DatasetDiff,
  RenameColumnChange,
} from "./dataset-diff";

export function createDatasetDiff(
  before: Dataset,
  after: Dataset,
): DatasetDiff {
  const renamedColumns: RenameColumnChange[] = [];
  const deletedColumns: DeleteColumnChange[] = [];
  const modifiedCells: CellUpdateChange[] = [];
  const deletedColumnNames = new Set(
    before.columns.filter(
      (column) => !after.columns.includes(column),
    ),
  );

  before.columns.forEach((column, index) => {
    const nextColumn = after.columns[index];

    if (deletedColumnNames.has(column)) {
      deletedColumns.push({
        type: "delete_column",
        column,
      });
    } else if (
      before.columns.length === after.columns.length &&
      column !== nextColumn
    ) {
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

    after.columns.forEach((afterColumn, columnIndex) => {
      const beforeColumn =
        before.columns.length === after.columns.length
          ? before.columns[columnIndex]
          : afterColumn;

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
      deletedColumns:
        deletedColumns.length,
      modifiedCells:
        modifiedCells.length,
    },

    changes: [
      ...renamedColumns,
      ...deletedColumns,
      ...modifiedCells,
    ],
  };
}
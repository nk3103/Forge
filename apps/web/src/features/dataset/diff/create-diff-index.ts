import type {
  CellUpdateChange,
  DatasetDiff,
  RenameColumnChange,
} from "./dataset-diff";

export interface DiffIndex {
  renamedColumns: Map<
    string,
    RenameColumnChange
  >;

  deletedColumns: Set<string>;

  changedCells: Map<
    string,
    CellUpdateChange
  >;
}

export function createDiffIndex(
  diff: DatasetDiff,
): DiffIndex {
  const renamedColumns = new Map<
    string,
    RenameColumnChange
  >();

  const changedCells = new Map<
    string,
    CellUpdateChange
  >();

  const deletedColumns = new Set<string>();

  diff.changes.forEach((change) => {
    switch (change.type) {
      case "rename_column":
        renamedColumns.set(
          change.to,
          change,
        );
        break;

      case "cell_update":
        changedCells.set(
          `${change.rowIndex}:${change.column}`,
          change,
        );
        break;

      case "delete_column":
        deletedColumns.add(change.column);
        break;
    }
  });

  return {
    renamedColumns,
    deletedColumns,
    changedCells,
  };
}
export interface DatasetDiff {
  summary: DatasetDiffSummary;
  changes: DatasetChange[];
}

export interface DatasetDiffSummary {
  renamedColumns: number;
  deletedColumns: number;
  modifiedCells: number;
}

export type DatasetChange =
  | RenameColumnChange
  | DeleteColumnChange
  | CellUpdateChange;

export interface RenameColumnChange {
  type: "rename_column";

  from: string;
  to: string;
}

export interface DeleteColumnChange {
  type: "delete_column";
  column: string;
}

export interface CellUpdateChange {
  type: "cell_update";

  rowIndex: number;
  column: string;

  before: unknown;
  after: unknown;
}
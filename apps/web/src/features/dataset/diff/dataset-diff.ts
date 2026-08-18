export interface DatasetDiff {
  summary: DatasetDiffSummary;
  changes: DatasetChange[];
}

export interface DatasetDiffSummary {
  renamedColumns: number;
  modifiedCells: number;
}

export type DatasetChange =
  | RenameColumnChange
  | CellUpdateChange;

export interface RenameColumnChange {
  type: "rename_column";

  from: string;
  to: string;
}

export interface CellUpdateChange {
  type: "cell_update";

  rowIndex: number;
  column: string;

  before: unknown;
  after: unknown;
}
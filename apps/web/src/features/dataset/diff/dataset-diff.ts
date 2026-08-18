export interface DatasetDiff {
  summary: DatasetDiffSummary;
  changes: DatasetChange[];
}

export interface DatasetDiffSummary {
  renamedColumns: number;
  modifiedCells: number;
}

export interface DatasetChange {
  type: "rename_column" | "cell_update";

  column?: string;

  rowIndex?: number;

  before: unknown;

  after: unknown;
}
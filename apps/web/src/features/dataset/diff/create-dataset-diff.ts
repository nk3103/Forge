import type { Dataset } from "../types";
import type { DatasetDiff } from "./dataset-diff";

export function createDatasetDiff(
  before: Dataset,
  after: Dataset,
): DatasetDiff {
  const changes: DatasetDiff["changes"] = [];

  let renamedColumns = 0;

  before.columns.forEach((column, index) => {
    if (column !== after.columns[index]) {
      renamedColumns++;

      changes.push({
        type: "rename_column",

        before: column,

        after: after.columns[index],

        column: after.columns[index],
      });
    }
  });

  return {
    summary: {
      renamedColumns,
      modifiedCells: 0,
    },

    changes,
  };
}
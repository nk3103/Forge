"use client";

import type { DiffIndex } from "../diff/create-diff-index";
import type { Dataset } from "../types";

import { DataTable } from "./data-table";

interface DatasetPreviewProps {
  dataset: Dataset;
  diffIndex?: DiffIndex;
}

export function DatasetPreview({
  dataset,
  diffIndex,
}: DatasetPreviewProps) {
  return (
    <div className="space-y-4 rounded-xl border p-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Result preview
          </p>
          <h2 className="mt-1 text-lg font-semibold">
            {dataset.name}
          </h2>
        </div>

        <p className="text-right text-sm text-muted-foreground">
          {dataset.rows.length} rows •{" "}
          {dataset.columns.length} columns
        </p>
      </div>

      <DataTable
        dataset={dataset}
        diffIndex={diffIndex}
      />
    </div>
  );
}
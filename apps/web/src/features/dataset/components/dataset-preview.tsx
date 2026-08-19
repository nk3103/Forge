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
      <div>
        <h2 className="text-xl font-semibold">
          {dataset.name}
        </h2>

        <p className="text-muted-foreground">
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
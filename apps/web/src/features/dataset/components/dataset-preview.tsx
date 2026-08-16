"use client";

import type { Dataset } from "../types";

interface DatasetPreviewProps {
  dataset: Dataset;
}

export function DatasetPreview({
  dataset,
}: DatasetPreviewProps) {
  return (
    <div className="space-y-4 rounded-xl border p-6">
      <h2 className="text-xl font-semibold">
        {dataset.name}
      </h2>

      <p className="text-muted-foreground">
        {dataset.rows.length} rows • {dataset.columns.length} columns
      </p>
    </div>
  );
}
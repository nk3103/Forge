"use client";

import type { Dataset } from "../types";

import { DatasetUpload } from "./dataset-upload";

interface EmptyWorkspaceProps {
  onDatasetLoaded: (dataset: Dataset) => void;
}

export function EmptyWorkspace({
  onDatasetLoaded,
}: EmptyWorkspaceProps) {
  return (
    <section className="rounded-2xl border border-dashed border-border/60 p-12">
      <div className="flex flex-col items-center gap-6">
        <DatasetUpload onDatasetLoaded={onDatasetLoaded} />

        <p className="max-w-md text-center text-sm text-muted-foreground">
          Upload your first spreadsheet to teach Forge how you clean,
          transform and organize data.
        </p>
      </div>
    </section>
  );
}

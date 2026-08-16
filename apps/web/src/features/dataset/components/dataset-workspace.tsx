"use client";

import { useState } from "react";

import type { Dataset } from "../types";
import { DatasetPreview } from "./dataset-preview";
import { DatasetUpload } from "./dataset-upload";

export function DatasetWorkspace() {
  const [dataset, setDataset] = useState<Dataset | null>(null);

  return (
    <section className="rounded-2xl border border-dashed border-border/60 p-8 transition-all">
      {dataset ? (
        <DatasetPreview dataset={dataset} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 py-12">
          <DatasetUpload onDatasetLoaded={setDataset} />

          <p className="max-w-md text-center text-sm text-muted-foreground">
            Upload your first spreadsheet to teach Forge how you clean,
            transform, and organize data.
          </p>
        </div>
      )}
    </section>
  );
}
"use client";

import { useMemo, useState } from "react";

import type { Dataset } from "../types";



import { DatasetUpload } from "./dataset-upload";
import { DatasetHeader } from "./dataset-header";
import { DataTable } from "./data-table";

import { applyOperations } from "@/features/operations/apply-operations";
import type { Operation } from "@/features/operations/operation-types";

export function DatasetWorkspace() {
  const [originalDataset, setOriginalDataset] =
    useState<Dataset | null>(null);

  const [operations] = useState<Operation[]>([]);

  const dataset = useMemo(() => {
    if (!originalDataset) return null;

    return applyOperations(
      originalDataset,
      operations,
    );
  }, [originalDataset, operations]);

  if (!dataset) {
    return (
      <section className="rounded-2xl border border-dashed border-border/60 p-12">
        <div className="flex flex-col items-center gap-6">
          <DatasetUpload
            onDatasetLoaded={setOriginalDataset}
          />

          <p className="max-w-md text-center text-sm text-muted-foreground">
            Upload your first spreadsheet to teach Forge how
            you clean, transform and organize data.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 rounded-2xl border bg-background p-6 shadow-sm">
      <DatasetHeader dataset={dataset} />

      <DataTable dataset={dataset} />

      {/* Operation Log */}
    </section>
  );
}
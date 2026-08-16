"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { CommandBar } from "@/features/commands/command-bar";
import { createDatasetSignature } from "@/features/knowledge/dataset-signature";
import { rememberWorkflow } from "@/features/knowledge/workflow-knowledge";
import { WorkflowTimeline } from "@/features/operations/workflow-timeline";
import { applyOperations } from "@/features/operations/apply-operations";
import type { Operation } from "@/features/operations/operation-types";

import type { Dataset } from "../types";

import { DataTable } from "./data-table";
import { DatasetHeader } from "./dataset-header";
import { DatasetUpload } from "./dataset-upload";

export function DatasetWorkspace() {
  const [originalDataset, setOriginalDataset] =
    useState<Dataset | null>(null);

  const [operations, setOperations] =
    useState<Operation[]>([]);

  const [workflowSaved, setWorkflowSaved] =
    useState(false);

  const dataset = useMemo(() => {
    if (!originalDataset) {
      return null;
    }

    return applyOperations(
      originalDataset,
      operations,
    );
  }, [originalDataset, operations]);

  const handleOperation = useCallback(
    (operation: Operation) => {
      setOperations((current) => [
        ...current,
        operation,
      ]);

      setWorkflowSaved(false);
    },
    [],
  );

  const handleSaveWorkflow = useCallback(() => {
    if (!originalDataset) return;

    rememberWorkflow({
      id: crypto.randomUUID(),
      datasetSignature:
        createDatasetSignature(originalDataset),
      operations: [...operations],
    });

    setWorkflowSaved(true);
  }, [originalDataset, operations]);

  const handleDatasetLoaded = useCallback(
    (dataset: Dataset) => {
      setOriginalDataset(dataset);
      setOperations([]);
      setWorkflowSaved(false);
    },
    [],
  );

  if (!dataset) {
    return (
      <section className="rounded-2xl border border-dashed border-border/60 p-12">
        <div className="flex flex-col items-center gap-6">
          <DatasetUpload
            onDatasetLoaded={handleDatasetLoaded}
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
    <section className="space-y-6 rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
      <DatasetHeader dataset={dataset} />

      <DataTable dataset={dataset} />

      <WorkflowTimeline
        operations={operations}
      />

      <div className="flex justify-end">
        <Button
          onClick={handleSaveWorkflow}
          disabled={
            operations.length === 0 ||
            workflowSaved
          }
        >
          {workflowSaved
            ? "Workflow Saved"
            : "Save Workflow"}
        </Button>
      </div>

      <CommandBar
        dataset={dataset}
        onOperation={handleOperation}
      />
    </section>
  );
}
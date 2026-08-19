"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { CommandBar } from "@/features/commands/command-bar";

import {
  createDatasetSignature,
} from "@/features/knowledge/dataset-signature";

import {
  rememberWorkflow,
  type LearnedWorkflow,
} from "@/features/knowledge/workflow-knowledge";

import {
  recordWorkflowUsage,
  saveWorkflow,
} from "@/features/workflow/workflow-repository";
import type { Workflow } from "@/features/workflow/types";
import { createWorkflow } from "@/features/workflow/create-workflow";
import { workflowToGeneratedPlan } from "@/features/workflow/workflow-to-plan";
import { WorkflowLibrary } from "@/features/workflow/workflow-library";

import { suggestWorkflow } from "@/features/knowledge/workflow-suggestions";
import { WorkflowSuggestion } from "@/features/knowledge/workflow-suggestion";

import { WorkflowTimeline } from "@/features/operations/workflow-timeline";
import { applyOperations } from "@/features/operations/apply-operations";
import type { Operation } from "@/features/operations/operation-types";

import type { Dataset } from "../types";

import { DataTable } from "./data-table";
import { DatasetHeader } from "./dataset-header";
import { DatasetUpload } from "./dataset-upload";
import { PlanSession } from "@/features/planner/plan-session";
import type { GeneratedPlan } from "@/features/planner/planner-types";

export function DatasetWorkspace() {
  const [originalDataset, setOriginalDataset] =
    useState<Dataset | null>(null);

  const [operations, setOperations] =
    useState<Operation[]>([]);

  const [workflowSaved, setWorkflowSaved] =
    useState(false);

  const [suggestedWorkflow, setSuggestedWorkflow] =
    useState<LearnedWorkflow | null>(null);

  const [executionPlan, setExecutionPlan] =
    useState<{
      plan: GeneratedPlan;
      workflowId?: string;
    } | null>(null);

  const dataset = useMemo(() => {
    if (!originalDataset) {
      return null;
    }

    return applyOperations(
      originalDataset,
      operations,
    );
  }, [originalDataset, operations]);

  const sourceDatasetSignature =
    originalDataset
      ? createDatasetSignature(originalDataset)
      : dataset
        ? createDatasetSignature(dataset)
        : "";

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

    saveWorkflow(
      createWorkflow({
        name: originalDataset.name,
        description: "Saved workflow",
        operations: [...operations],
        sourcePrompt: "",
        datasetSignature:
          createDatasetSignature(originalDataset),
      }),
    );

    rememberWorkflow({
      id: crypto.randomUUID(),
      datasetSignature:
        createDatasetSignature(originalDataset),
      operations: [...operations],
    });

    setWorkflowSaved(true);
  }, [originalDataset, operations]);

  const handleExecutionRequested = useCallback(
    (plan: GeneratedPlan) => {
      setExecutionPlan({ plan });
    },
    [],
  );

  const handlePreviewWorkflow = useCallback(
    (workflow: Workflow) => {
      setExecutionPlan({
        workflowId: workflow.metadata.id,
        plan: workflowToGeneratedPlan(workflow),
      });
    },
    [],
  );

  const handleDatasetLoaded = useCallback(
    (dataset: Dataset) => {
      setOriginalDataset(dataset);

      setOperations([]);

      setWorkflowSaved(false);

      setExecutionPlan(null);

      const workflow =
        suggestWorkflow(dataset);

      setSuggestedWorkflow(
        workflow ?? null,
      );
    },
    [],
  );

  const handleApplyWorkflow =
    useCallback(() => {
      if (!suggestedWorkflow) return;

      const now = Date.now();

const replayedOperations =
  suggestedWorkflow.operations.map(
    (operation, index) => ({
      ...operation,
      id: crypto.randomUUID(),
      timestamp: now + index,
    }),
  );

      setOperations(replayedOperations);

      setSuggestedWorkflow(null);
    }, [suggestedWorkflow]);

  const handleDismissSuggestion =
    useCallback(() => {
      setSuggestedWorkflow(null);
    }, []);

  const handleApplySavedWorkflow = useCallback(
    (plan: GeneratedPlan) => {
      setOperations((current) => [
        ...current,
        ...plan.steps.map(
          (step) => step.operation,
        ),
      ]);

      if (executionPlan?.workflowId) {
        recordWorkflowUsage(
          executionPlan.workflowId,
        );
      } else if (plan.sourcePrompt) {
        saveWorkflow(
          createWorkflow({
            name:
              plan.sourcePrompt.slice(0, 80) ||
              "Untitled workflow",
            description: plan.sourcePrompt,
            operations: plan.steps.map(
              (step) => step.operation,
            ),
            sourcePrompt: plan.sourcePrompt,
            datasetSignature:
              sourceDatasetSignature,
          }),
        );
      }

      setExecutionPlan(null);
    },
    [
      executionPlan,
      sourceDatasetSignature,
    ],
  );

  return (
    <section className="space-y-6">
      {!dataset ? (
        <section className="rounded-2xl border border-dashed border-border/60 p-12">
        <div className="flex flex-col items-center gap-6">
          <DatasetUpload
            onDatasetLoaded={
              handleDatasetLoaded
            }
          />

          <p className="max-w-md text-center text-sm text-muted-foreground">
            Upload your first spreadsheet to
            teach Forge how you clean,
            transform and organize data.
          </p>
        </div>
        </section>
      ) : (
        <section className="space-y-6 rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <DatasetHeader dataset={dataset} />

            <DatasetUpload
              compact
              onDatasetLoaded={handleDatasetLoaded}
            />
          </div>

          <DataTable dataset={dataset} />

          {suggestedWorkflow && (
            <WorkflowSuggestion
              workflow={suggestedWorkflow}
              onApply={handleApplyWorkflow}
              onDismiss={handleDismissSuggestion}
            />
          )}

          <WorkflowLibrary
            onPreviewWorkflow={handlePreviewWorkflow}
          />

          <CommandBar
            dataset={dataset}
            onOperation={handleOperation}
            onExecutionRequested={
              handleExecutionRequested
            }
          />

          {executionPlan && (
            <PlanSession
              dataset={dataset}
              plan={executionPlan.plan}
              onApply={handleApplySavedWorkflow}
            />
          )}

          <WorkflowTimeline operations={operations} />

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
        </section>
      )}
    </section>
  );
}
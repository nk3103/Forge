"use client";

import { useCallback, useMemo, useState } from "react";

import {
  createDatasetSignature,
  datasetSignatureKey,
} from "@/features/knowledge/dataset-signature";
import { findBestWorkflowMatch } from "@/features/knowledge/workflow-matcher";

import {
  rememberWorkflow,
  type LearnedWorkflow,
} from "@/features/knowledge/workflow-knowledge";

import {
  recordWorkflowUsage,
  loadWorkflows,
  saveWorkflow,
} from "@/features/workflow/workflow-repository";
import type { Workflow } from "@/features/workflow/types";
import { createWorkflow } from "@/features/workflow/create-workflow";
import { workflowToGeneratedPlan } from "@/features/workflow/workflow-to-plan";

import { suggestWorkflow } from "@/features/knowledge/workflow-suggestions";

import { applyOperations } from "@/features/operations/apply-operations";
import type { Operation } from "@/features/operations/operation-types";

import type { Dataset } from "../types";

import type { GeneratedPlan } from "@/features/planner/planner-types";
import { EmptyWorkspace } from "./empty-workspace";
import { LoadedWorkspace } from "./loaded-workspace";

export function DatasetWorkspace() {
  const [originalDataset, setOriginalDataset] =
    useState<Dataset | null>(null);

  const [operations, setOperations] =
    useState<Operation[]>([]);

  const [workflowSaved, setWorkflowSaved] =
    useState(false);

  const [suggestedWorkflow, setSuggestedWorkflow] =
    useState<LearnedWorkflow | null>(null);

  const [matchedWorkflow, setMatchedWorkflow] =
    useState<ReturnType<typeof findBestWorkflowMatch>>(null);

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

  const sourceDatasetSignature = useMemo(
    () =>
      originalDataset
        ? createDatasetSignature(originalDataset)
        : dataset
          ? createDatasetSignature(dataset)
          : {
            originalColumns: [],
            normalizedColumns: [],
              columnCount: 0,
              columnTypes: {},
            },
    [originalDataset, dataset],
  );

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
        datasetSignatureKey(
          createDatasetSignature(originalDataset),
        ),
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

      setMatchedWorkflow(
        findBestWorkflowMatch(
          dataset,
          loadWorkflows(),
        ),
      );

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

  if (!dataset) {
    return (
      <EmptyWorkspace
        onDatasetLoaded={handleDatasetLoaded}
      />
    );
  }

  return (
    <LoadedWorkspace
      dataset={dataset}
      suggestedWorkflow={suggestedWorkflow}
      matchedWorkflow={matchedWorkflow}
      executionPlan={executionPlan}
      operations={operations}
      workflowSaved={workflowSaved}
      onDatasetLoaded={handleDatasetLoaded}
      onApplySuggestedWorkflow={handleApplyWorkflow}
      onDismissSuggestion={handleDismissSuggestion}
      onPreviewWorkflow={handlePreviewWorkflow}
      onOperation={handleOperation}
      onExecutionRequested={handleExecutionRequested}
      onApplyExecution={handleApplySavedWorkflow}
      onSaveWorkflow={handleSaveWorkflow}
    />
  );
}
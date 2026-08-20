"use client";

import { Button } from "@/components/ui/button";

import { CommandBar } from "@/features/commands/command-bar";
import { WorkflowSuggestion } from "@/features/knowledge/workflow-suggestion";
import { PlanSession } from "@/features/planner/plan-session";
import type { GeneratedPlan } from "@/features/planner/planner-types";
import { WorkflowLibrary } from "@/features/workflow/workflow-library";
import type { Workflow } from "@/features/workflow/types";
import type { LearnedWorkflow } from "@/features/knowledge/workflow-knowledge";
import type { WorkflowMatch } from "@/features/knowledge/workflow-matcher";

import type { Dataset } from "../types";

import { DataTable } from "./data-table";
import { DatasetHeader } from "./dataset-header";
import { DatasetUpload } from "./dataset-upload";
import { SuggestedWorkflows } from "./suggested-workflows";
import { WorkflowTimeline } from "@/features/operations/workflow-timeline";

interface LoadedWorkspaceProps {
  dataset: Dataset;
  suggestedWorkflow: LearnedWorkflow | null;
  matchedWorkflow: WorkflowMatch | null;
  executionPlan: {
    plan: GeneratedPlan;
    workflowId?: string;
  } | null;
  operations: Operation[];
  workflowSaved: boolean;
  onDatasetLoaded: (dataset: Dataset) => void;
  onApplySuggestedWorkflow: () => void;
  onDismissSuggestion: () => void;
  onPreviewWorkflow: (workflow: Workflow) => void;
  onExecutionRequested: (plan: GeneratedPlan) => void;
  onApplyExecution: (plan: GeneratedPlan) => void;
  onSaveWorkflow: () => void;
}

export function LoadedWorkspace({
  dataset,
  suggestedWorkflow,
  matchedWorkflow,
  executionPlan,
  operations,
  workflowSaved,
  onDatasetLoaded,
  onApplySuggestedWorkflow,
  onDismissSuggestion,
  onPreviewWorkflow,
  onExecutionRequested,
  onApplyExecution,
  onSaveWorkflow,
}: LoadedWorkspaceProps) {
  return (
    <section className="space-y-6 rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <DatasetHeader dataset={dataset} />

        <DatasetUpload
          compact
          onDatasetLoaded={onDatasetLoaded}
        />
      </div>

      <DataTable dataset={dataset} />

      <SuggestedWorkflows
        match={matchedWorkflow}
        onPreview={() => {
          if (matchedWorkflow) {
            onPreviewWorkflow(matchedWorkflow.workflow);
          }
        }}
      />

      {suggestedWorkflow && (
        <WorkflowSuggestion
          workflow={suggestedWorkflow}
          onApply={onApplySuggestedWorkflow}
          onDismiss={onDismissSuggestion}
        />
      )}

      <WorkflowLibrary
        onPreviewWorkflow={onPreviewWorkflow}
      />

      <CommandBar
        dataset={dataset}
        onExecutionRequested={onExecutionRequested}
      />

      {executionPlan && (
        <PlanSession
          dataset={dataset}
          plan={executionPlan.plan}
          onApply={onApplyExecution}
        />
      )}

      <WorkflowTimeline operations={operations} />

      <div className="flex justify-end">
        <Button
          onClick={onSaveWorkflow}
          disabled={operations.length === 0 || workflowSaved}
        >
          {workflowSaved ? "Workflow Saved" : "Save Workflow"}
        </Button>
      </div>
    </section>
  );
}

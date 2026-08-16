"use client";

import { Button } from "@/components/ui/button";

import type { LearnedWorkflow } from "./workflow-knowledge";

interface WorkflowSuggestionProps {
  workflow: LearnedWorkflow;
  onApply: () => void;
  onDismiss: () => void;
}

export function WorkflowSuggestion({
  workflow,
  onApply,
  onDismiss,
}: WorkflowSuggestionProps) {
  return (
    <section className="rounded-xl border border-primary/20 bg-primary/5 p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          💡 Forge recognizes this workflow
        </h3>

        <p className="text-sm text-muted-foreground">
          You've previously taught Forge a workflow for a
          dataset with the same structure.
        </p>

        <p className="text-sm">
          {workflow.operations.length} transformation
          {workflow.operations.length === 1 ? "" : "s"}{" "}
          available.
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <Button onClick={onApply}>
          Apply Workflow
        </Button>

        <Button
          variant="outline"
          onClick={onDismiss}
        >
          Dismiss
        </Button>
      </div>
    </section>
  );
}
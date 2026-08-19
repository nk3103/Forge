"use client";

import type { WorkflowMatch } from "@/features/knowledge/workflow-matcher";
import { SuggestedWorkflowCard } from "@/features/workflow/workflow-suggestion-card";

interface SuggestedWorkflowsProps {
  match: WorkflowMatch | null;
  onPreview: () => void;
}

export function SuggestedWorkflows({
  match,
  onPreview,
}: SuggestedWorkflowsProps) {
  if (match) {
    return (
      <SuggestedWorkflowCard
        match={match}
        onPreview={onPreview}
      />
    );
  }

  return (
    <section className="rounded-xl border bg-muted/30 p-5">
      <h3 className="text-lg font-semibold">
        Suggested Workflows
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        No suggested workflows yet.
      </p>
    </section>
  );
}

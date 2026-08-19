"use client";

import { Button } from "@/components/ui/button";
import type { WorkflowMatch } from "@/features/knowledge/workflow-matcher";

interface WorkflowSuggestionCardProps {
  match: WorkflowMatch;
  onPreview: () => void;
}

export function WorkflowSuggestionCard({
  match,
  onPreview,
}: WorkflowSuggestionCardProps) {
  return (
    <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Suggested Workflow
          </p>
          <h3 className="mt-1 text-lg font-semibold">
            {match.workflow.metadata.name}
          </h3>
        </div>
        <span className="text-sm font-medium">
          {Math.round(match.score * 100)}% match
        </span>
      </div>

      {match.workflow.sourcePrompt && (
        <p className="mt-3 text-sm text-muted-foreground">
          {match.workflow.sourcePrompt}
        </p>
      )}

      <Button className="mt-4" onClick={onPreview}>
        Preview Workflow
      </Button>
    </section>
  );
}
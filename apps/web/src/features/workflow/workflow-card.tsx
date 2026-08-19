"use client";

import type { Workflow } from "./types";

interface WorkflowCardProps {
  workflow: Workflow;
  selected: boolean;
  onSelect: () => void;
}

export function WorkflowCard({
  workflow,
  selected,
  onSelect,
}: WorkflowCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border bg-background p-4 text-left transition-colors hover:bg-muted/50 ${
        selected ? "border-foreground" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-medium">
          {workflow.metadata.name}
        </span>
        <span className="shrink-0 text-xs text-muted-foreground">
          v{workflow.version}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <span>{workflow.operations.length} operations</span>
        <span>{new Date(workflow.createdAt).toLocaleDateString()}</span>
        <span>{workflow.usageCount} uses</span>
      </div>
    </button>
  );
}
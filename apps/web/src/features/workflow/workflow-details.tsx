"use client";

import type { Workflow } from "./types";

interface WorkflowDetailsProps {
  workflow: Workflow;
}

export function WorkflowDetails({
  workflow,
}: WorkflowDetailsProps) {
  return (
    <div className="rounded-xl border bg-muted/30 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Selected workflow
          </p>
          <h3 className="mt-1 text-lg font-semibold">
            {workflow.metadata.name}
          </h3>
        </div>

        <span className="rounded-md border bg-background px-2 py-1 text-xs">
          Version {workflow.version}
        </span>
      </div>

      {workflow.metadata.description && (
        <p className="mt-4 text-sm text-muted-foreground">
          {workflow.metadata.description}
        </p>
      )}

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Created</dt>
          <dd className="font-medium">
            {new Date(workflow.createdAt).toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Updated</dt>
          <dd className="font-medium">
            {new Date(workflow.updatedAt).toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Operations</dt>
          <dd className="font-medium">
            {workflow.operations.length}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Usage count</dt>
          <dd className="font-medium">
            {workflow.usageCount}
          </dd>
        </div>
      </dl>

      {workflow.sourcePrompt && (
        <div className="mt-5 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Source prompt
          </p>
          <p className="mt-1 text-sm">
            {workflow.sourcePrompt}
          </p>
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

import {
  loadWorkflows,
  subscribeWorkflowChanges,
} from "./workflow-repository";
import type { Workflow } from "./types";
import { WorkflowCard } from "./workflow-card";
import { WorkflowDetails } from "./workflow-details";

interface WorkflowLibraryProps {
  onPreviewWorkflow: (workflow: Workflow) => void;
}

export function WorkflowLibrary({
  onPreviewWorkflow,
}: WorkflowLibraryProps) {
  const [workflows, setWorkflows] =
    useState<Workflow[]>([]);
  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  useEffect(() => {
    const refresh = () => setWorkflows(loadWorkflows());

    refresh();

    return subscribeWorkflowChanges(refresh);
  }, []);

  const selectedWorkflow =
    workflows.find(
      (workflow) =>
        workflow.metadata.id === selectedId,
    ) ?? null;

  return (
    <section className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Workflow Platform
        </p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="mt-1 text-2xl font-semibold">
              Workflow Library
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Saved workflows ready to review.
            </p>
          </div>
          <span className="text-sm text-muted-foreground">
            {workflows.length} saved
          </span>
        </div>
      </div>

      {workflows.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Saved workflows will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="space-y-3">
            {workflows.map((workflow) => (
              <WorkflowCard
                key={workflow.metadata.id}
                workflow={workflow}
                selected={
                  workflow.metadata.id === selectedId
                }
                onSelect={() =>
                  setSelectedId(workflow.metadata.id)
                }
              />
            ))}
          </div>

          {selectedWorkflow ? (
            <WorkflowDetails
              workflow={selectedWorkflow}
              onPreview={() =>
                onPreviewWorkflow(selectedWorkflow)
              }
            />
          ) : (
            <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed p-5 text-center text-sm text-muted-foreground">
              Select a workflow to view its details.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
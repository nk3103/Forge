"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import type { Dataset } from "@/features/dataset/types";
import type { Operation } from "@/features/operations/operation-types";
import { createDatasetSignature } from "@/features/knowledge/dataset-signature";
import { createWorkflow } from "@/features/workflow/create-workflow";
import type { Workflow } from "@/features/workflow/types";

import { DeleteColumnCommand } from "./delete-column-command";
import { RenameColumnCommand } from "./rename-column-command";

import { PlannerView } from "@/features/planner/planner-view";
import { OpenAIPlanner } from "@/features/planner/openai-planner";
import { PlanSession } from "@/features/planner/plan-session";

import type {
  GeneratedPlan as GeneratedPlanType,
} from "@/features/planner/planner-types";

interface CommandBarProps {
  dataset: Dataset;
  datasetSignature?: string;
  onOperation: (operation: Operation) => void;
  onWorkflowSaved?: (workflow: Workflow) => void;
}

export function CommandBar({
  dataset,
  datasetSignature,
  onOperation,
  onWorkflowSaved,
}: CommandBarProps) {
  const [mode, setMode] =
    useState<"manual" | "ai">("manual");

  const [loading, setLoading] =
    useState(false);

  const [plan, setPlan] =
    useState<GeneratedPlanType | null>(
      null,
    );

  const [sourcePrompt, setSourcePrompt] =
    useState("");

  const planner = useMemo(
    () => new OpenAIPlanner(),
    [],
  );

  async function handleGenerate(
    prompt: string,
  ) {
    setSourcePrompt(prompt);
    setLoading(true);

    try {
      const generated =
        await planner.generatePlan(
          dataset,
          prompt,
        );

      setPlan(generated);
    } finally {
      setLoading(false);
    }
  }

function handleApply(
  plan: GeneratedPlanType,
) {
  plan.steps.forEach((step) => {
    onOperation(step.operation);
  });

  onWorkflowSaved?.(
    createWorkflow({
      name: sourcePrompt.slice(0, 80) || "Untitled workflow",
      description: sourcePrompt,
      operations: plan.steps.map(
        (step) => step.operation,
      ),
      sourcePrompt,
      datasetSignature:
        datasetSignature ?? createDatasetSignature(dataset),
    }),
  );

  setPlan(null);
  setMode("manual");
}

  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          Teach Forge
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Show Forge how you&apos;d like this dataset
          to be transformed.
        </p>
      </div>

      <div className="mb-6 inline-flex rounded-lg border bg-muted p-1">
        <button
          type="button"
          onClick={() => setMode("manual")}
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium transition-colors",
            mode === "manual"
              ? "bg-background shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Manual
        </button>

        <button
          type="button"
          onClick={() => setMode("ai")}
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium transition-colors",
            mode === "ai"
              ? "bg-background shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          AI
        </button>
      </div>

      {mode === "manual" ? (
        <div className="space-y-8">
          <RenameColumnCommand
            columns={dataset.columns}
            onSubmit={onOperation}
          />

          <DeleteColumnCommand
            columns={dataset.columns}
            onSubmit={onOperation}
          />
        </div>
      ) : (
        <>
          <PlannerView
            loading={loading}
            onGenerate={handleGenerate}
          />

          {plan && (
            <PlanSession
              dataset={dataset}
              plan={plan}
              onApply={handleApply}
            />
          )}
        </>
      )}
    </section>
  );
}
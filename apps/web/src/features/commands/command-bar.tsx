"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Dataset } from "@/features/dataset/types";
import type { Operation } from "@/features/operations/operation-types";

import { RenameColumnCommand } from "./rename-column-command";

import { PlannerView } from "@/features/planner/planner-view";
import { GeneratedPlan } from "@/features/planner/generated-plan";
import { MockPlanner } from "@/features/planner/mock-planner";
import { OpenAIPlanner } from "@/features/planner/openai-planner";

import type {
  GeneratedPlan as GeneratedPlanType,
} from "@/features/planner/planner-types";

interface CommandBarProps {
  dataset: Dataset;
  onOperation: (operation: Operation) => void;
}

export function CommandBar({
  dataset,
  onOperation,
}: CommandBarProps) {
  const [mode, setMode] =
    useState<"manual" | "ai">("manual");

  const [loading, setLoading] =
    useState(false);

  const [plan, setPlan] =
    useState<GeneratedPlanType | null>(
      null,
    );

  const planner = useMemo(
  () => new OpenAIPlanner(),
  [],
);

  async function handleGenerate(
    prompt: string,
  ) {
    setLoading(true);

    const generated =
      await planner.generatePlan(
        dataset,
        prompt,
      );

    setPlan(generated);

    setLoading(false);
  }

  function handleApply() {
  if (!plan) return;

  plan.steps.forEach((step) => {
    onOperation(step.operation);
  });

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
          Show Forge how you'd like this dataset
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
        <RenameColumnCommand
          columns={dataset.columns}
          onSubmit={onOperation}
        />
      ) : (
        <>
          <PlannerView
            loading={loading}
            onGenerate={handleGenerate}
          />

          {plan && (
            <GeneratedPlan
              plan={plan}
              onApply={handleApply}
            />
          )}
        </>
      )}
    </section>
  );
}
"use client";

import { useMemo, useState } from "react";

import type { Dataset } from "@/features/dataset/types";

import { PlannerView } from "@/features/planner/planner-view";
import { OpenAIPlanner } from "@/features/planner/openai-planner";

import type {
  GeneratedPlan as GeneratedPlanType,
} from "@/features/planner/planner-types";

interface CommandBarProps {
  dataset: Dataset;
  onExecutionRequested: (
    plan: GeneratedPlanType,
  ) => void;
  onPlannerLoadingChange: (loading: boolean) => void;
}

export function CommandBar({
  dataset,
  onExecutionRequested,
  onPlannerLoadingChange,
}: CommandBarProps) {
  const [loading, setLoading] =
    useState(false);

  const planner = useMemo(
    () => new OpenAIPlanner(),
    [],
  );

  async function handleGenerate(
    prompt: string,
  ) {
    setLoading(true);
    onPlannerLoadingChange(true);

    try {
      const generated =
        await planner.generatePlan(
          dataset,
          prompt,
        );

      onExecutionRequested({
        ...generated,
        sourcePrompt: prompt,
      });
    } finally {
      setLoading(false);
      onPlannerLoadingChange(false);
    }
  }

  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          Teach Forge with natural language
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Describe the transformation you want, and Forge
          will prepare an editable execution plan.
        </p>
      </div>

      <PlannerView
        loading={loading}
        onGenerate={handleGenerate}
      />
    </section>
  );
}

"use client";

import { useMemo } from "react";

import { Button } from "@/components/ui/button";

import type { Dataset } from "@/features/dataset/types";
import { DatasetPreview } from "@/features/dataset/components/dataset-preview";

import { applyOperations } from "@/features/operations/apply-operations";

import { createDatasetDiff } from "@/features/dataset/diff/create-dataset-diff";

import { GeneratedPlan } from "./generated-plan";
import type { GeneratedPlan as GeneratedPlanType } from "./planner-types";
import { PlanValidation } from "./plan-validation";
import { validatePlan } from "./plan-validator";
import { ChangeSummary } from "./change-summary";

interface PlanSessionProps {
  dataset: Dataset;
  plan: GeneratedPlanType;
  onApply: () => void;
}

export function PlanSession({
  dataset,
  plan,
  onApply,
}: PlanSessionProps) {
  const issues = useMemo(
    () => validatePlan(dataset, plan),
    [dataset, plan],
  );

  const hasErrors = issues.some(
    (issue) => issue.severity === "error",
  );

  const previewDataset = useMemo(
    () =>
      applyOperations(
        dataset,
        plan.steps.map((step) => step.operation),
      ),
    [dataset, plan],
  );

  const diff = useMemo(
    () =>
      createDatasetDiff(
        dataset,
        previewDataset,
      ),
    [dataset, previewDataset],
  );

  return (
    <div className="space-y-6">
      <GeneratedPlan plan={plan} />

      <PlanValidation issues={issues} />

      <ChangeSummary diff={diff} />

      <DatasetPreview
        dataset={previewDataset}
      />

      <div className="flex justify-end">
        <Button
          disabled={hasErrors}
          onClick={onApply}
        >
          Apply Plan
        </Button>
      </div>
    </div>
  );
}
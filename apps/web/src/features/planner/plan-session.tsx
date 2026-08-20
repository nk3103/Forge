"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import type { Dataset } from "@/features/dataset/types";
import { DatasetPreview } from "@/features/dataset/components/dataset-preview";

import { applyOperations } from "@/features/operations/apply-operations";

import { createDatasetDiff } from "@/features/dataset/diff/create-dataset-diff";
import { createDiffIndex } from "@/features/dataset/diff/create-diff-index";

import { GeneratedPlan } from "./generated-plan";
import type { GeneratedPlan as GeneratedPlanType } from "./planner-types";
import { PlanValidation } from "./plan-validation";
import { validatePlan } from "./plan-validator";
import { ChangeSummary } from "./change-summary";

interface PlanSessionProps {
  dataset: Dataset;
  plan: GeneratedPlanType;
  onApply: (
    plan: GeneratedPlanType,
  ) => void;
}

export function PlanSession({
  dataset,
  plan,
  onApply,
}: PlanSessionProps) {
  const [
    editablePlan,
    setEditablePlan,
  ] = useState(plan);

  useEffect(() => {
    setEditablePlan(plan);
  }, [plan]);

  const issues = useMemo(
    () =>
      validatePlan(
        dataset,
        editablePlan,
      ),
    [dataset, editablePlan],
  );

  const hasErrors = issues.some(
    (issue) => issue.severity === "error",
  );

  const previewDataset = useMemo(
    () =>
      applyOperations(
        dataset,
        editablePlan.steps.map(
          (step) => step.operation,
        ),
      ),
    [dataset, editablePlan],
  );

  const diff = useMemo(
    () =>
      createDatasetDiff(
        dataset,
        previewDataset,
      ),
    [dataset, previewDataset],
  );

  const diffIndex = useMemo(
    () => createDiffIndex(diff),
    [diff],
  );

  function handleApply() {
    onApply(editablePlan);
  }

  function handleRemoveStep(operationId?: string) {
    if (!operationId) return;

    setEditablePlan((currentPlan) => ({
      ...currentPlan,
      steps: currentPlan.steps.filter(
        (step) => step.operation.id !== operationId,
      ),
    }));
  }

  return (
    <div className="space-y-6">
      <GeneratedPlan
        plan={editablePlan}
        onPlanChange={setEditablePlan}
      />

      <PlanValidation
        issues={issues}
        onRemoveStep={handleRemoveStep}
      />

      <ChangeSummary diff={diff} />

      <DatasetPreview
        dataset={previewDataset}
        diffIndex={diffIndex}
      />

      <div className="flex justify-end">
        <Button
          disabled={hasErrors}
          onClick={handleApply}
        >
          Apply Plan
        </Button>
      </div>
    </div>
  );
}

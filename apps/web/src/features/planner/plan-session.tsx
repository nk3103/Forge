"use client";

import { useMemo } from "react";

import { Button } from "@/components/ui/button";

import type { Dataset } from "@/features/dataset/types";

import { GeneratedPlan } from "./generated-plan";
import type { GeneratedPlan as GeneratedPlanType } from "./planner-types";
import { PlanValidation } from "./plan-validation";
import { validatePlan } from "./plan-validator";

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

  return (
    <div className="space-y-6">
      <GeneratedPlan plan={plan} />

      <PlanValidation issues={issues} />

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
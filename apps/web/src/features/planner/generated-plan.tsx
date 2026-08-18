"use client";

import { Button } from "@/components/ui/button";

import { describeOperation } from "@/features/operations/describe-operation";

import type { GeneratedPlan } from "./planner-types";

interface GeneratedPlanProps {
  plan: GeneratedPlan;
  onApply: () => void;
}

export function GeneratedPlan({
  plan,
  onApply,
}: GeneratedPlanProps) {
  if (plan.steps.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6">
        <p className="text-sm text-muted-foreground">
          Forge couldn't generate a plan for this request.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border bg-muted/30 p-5">
      <div className="mb-5">
        <h4 className="font-semibold">
          AI Plan
        </h4>

        <p className="text-sm text-muted-foreground">
          Confidence:{" "}
          <span className="capitalize font-medium">
            {plan.confidence}
          </span>
        </p>
      </div>

      <div className="space-y-4">
        {plan.steps.map((step) => {
          const description =
            describeOperation(step.operation);

          return (
            <div
              key={step.operation.id}
              className="rounded-lg border bg-background p-4"
            >
              <div className="font-medium">
                {description.title}
              </div>

              <div className="text-sm text-muted-foreground">
                {description.description}
              </div>

              <div className="mt-2 text-sm">
                {step.explanation}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        className="mt-5"
        onClick={onApply}
      >
        Apply Plan
      </Button>
    </div>
  );
}
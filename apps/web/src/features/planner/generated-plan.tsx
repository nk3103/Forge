"use client";

import type { GeneratedPlan as GeneratedPlanType } from "./planner-types";

import { OperationCard } from "./operation-card";
import { OperationEditor } from "./operation-editors/operation-editor";

interface GeneratedPlanProps {
  plan: GeneratedPlanType;
  onPlanChange: (
    plan: GeneratedPlanType,
  ) => void;
}

export function GeneratedPlan({
  plan,
  onPlanChange,
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
          Confidence{" "}
          <span className="font-medium capitalize">
            {plan.confidence}
          </span>
        </p>
      </div>

      <div className="space-y-6">
        {plan.steps.map((step) => (
          <div
            key={step.operation.id}
            className="rounded-lg border bg-background p-4"
          >
            <OperationCard
              operation={step.operation}
              explanation={step.explanation}
            />

            <div className="mt-4 border-t pt-4">
              <OperationEditor
                operation={step.operation}
                onChange={(operation) => {
                  const updatedPlan = {
                    ...plan,
                    steps: plan.steps.map(
                      (currentStep) =>
                        currentStep.operation.id ===
                        operation.id
                          ? {
                              ...currentStep,
                              operation,
                            }
                          : currentStep,
                    ),
                  };

                  onPlanChange(updatedPlan);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
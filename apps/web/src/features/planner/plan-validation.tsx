"use client";

import { Button } from "@/components/ui/button";

import type { ValidationIssue } from "./plan-validator";

interface PlanValidationProps {
  issues: ValidationIssue[];
  onRemoveStep: (operationId?: string) => void;
}

export function PlanValidation({
  issues,
  onRemoveStep,
}: PlanValidationProps) {
  if (issues.length === 0) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <p className="text-sm font-medium text-green-700">
          ✓{" "}
          Plan validation passed
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
      <h4 className="font-medium text-yellow-800">
        Plan Validation
      </h4>

      <ul className="mt-2 space-y-2 text-sm">
        {issues.map((issue, index) => (
          <li
            key={`${issue.operationId ?? "issue"}-${index}`}
            className="flex items-center justify-between gap-4"
          >
            <span>
              <strong>
                {issue.severity.toUpperCase()}
              </strong>
              {" — "}
              {issue.message}
            </span>

            <Button
              variant="destructive"
              size="xs"
              onClick={() => onRemoveStep(issue.operationId)}
            >
              Remove Step
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import type { ValidationIssue } from "./plan-validator";

interface PlanValidationProps {
  issues: ValidationIssue[];
}

export function PlanValidation({
  issues,
}: PlanValidationProps) {
  if (issues.length === 0) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <p className="text-sm font-medium text-green-700">
          ✓ Plan validation passed
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
          <li key={index}>
            <strong>
              {issue.severity.toUpperCase()}
            </strong>
            {" — "}
            {issue.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
import type { Dataset } from "@/features/dataset/types";

import type { GeneratedPlan } from "./planner-types";

export interface ValidationIssue {
  severity: "error" | "warning";
  message: string;
}

export function validatePlan(
  dataset: Dataset,
  plan: GeneratedPlan,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const columns = new Set(dataset.columns);

  for (const step of plan.steps) {
    switch (step.operation.type) {
      case "rename_column": {
        const { from, to } = step.operation.payload;

        if (!columns.has(from)) {
          issues.push({
            severity: "error",
            message: `Column "${from}" does not exist.`,
          });
        }

        if (columns.has(to)) {
          issues.push({
            severity: "warning",
            message: `Column "${to}" already exists.`,
          });
        }

        break;
      }

      case "trim_whitespace": {
        const { column } = step.operation.payload;

        if (!columns.has(column)) {
          issues.push({
            severity: "error",
            message: `Column "${column}" does not exist.`,
          });
        }

        break;
      }

      default:
        break;
    }
  }

  return issues;
}
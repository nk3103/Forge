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

      case "replace_text": {
        const { column } = step.operation.payload;

        if (!columns.has(column)) {
          issues.push({
            severity: "error",
            message: `Column "${column}" does not exist.`,
          });
        }

        break;
      }

      case "uppercase": {
        const { column } = step.operation.payload;

        if (!columns.has(column)) {
          issues.push({
            severity: "error",
            message: `Column "${column}" does not exist.`,
          });
        }

        break;
      }

      case "lowercase": {
        const { column } = step.operation.payload;

        if (!columns.has(column)) {
          issues.push({
            severity: "error",
            message: `Column "${column}" does not exist.`,
          });
        }

        break;
      }

      case "title_case": {
        const { column } = step.operation.payload;

        if (!columns.has(column)) {
          issues.push({
            severity: "error",
            message: `Column "${column}" does not exist.`,
          });
        }

        break;
      }

      case "fill_missing_values": {
        const { column } = step.operation.payload;

        if (!columns.has(column)) {
          issues.push({
            severity: "error",
            message: `Column "${column}" does not exist.`,
          });
        }

        break;
      }

      case "remove_empty_rows":
        break;

      case "concatenate_columns": {
        const { columns: sourceColumns, destination } =
          step.operation.payload;

        for (const column of sourceColumns) {
          if (!columns.has(column)) {
            issues.push({
              severity: "error",
              message: `Column "${column}" does not exist.`,
            });
          }
        }

        if (!destination.trim()) {
          issues.push({
            severity: "error",
            message: "A destination column is required.",
          });
        }

        break;
      }

      case "split_column": {
        const { column, destinations } = step.operation.payload;

        if (!columns.has(column)) {
          issues.push({
            severity: "error",
            message: `Column "${column}" does not exist.`,
          });
        }

        if (destinations.length === 0) {
          issues.push({
            severity: "error",
            message: "At least one destination column is required.",
          });
        }

        if (destinations.some((destination) => !destination.trim())) {
          issues.push({
            severity: "error",
            message: "Destination column names cannot be empty.",
          });
        }

        break;
      }

      case "round_numbers": {
        const { column, decimals } = step.operation.payload;

        if (!columns.has(column)) {
          issues.push({
            severity: "error",
            message: `Column "${column}" does not exist.`,
          });
        }

        if (!Number.isInteger(decimals) || decimals < 0) {
          issues.push({
            severity: "error",
            message: "Decimal places must be a non-negative integer.",
          });
        }

        break;
      }

      case "delete_column": {
        const { column } = step.operation.payload;

        if (!columns.has(column)) {
          issues.push({
            severity: "error",
            message: `Column "${column}" does not exist.`,
          });
        }

        columns.delete(column);
        break;
      }

      default:
        break;
    }
  }

  return issues;
}
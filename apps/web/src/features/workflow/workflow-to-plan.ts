import type { GeneratedPlan } from "@/features/planner/planner-types";

import type { Workflow } from "./types";

export function workflowToGeneratedPlan(
  workflow: Workflow,
): GeneratedPlan {
  return {
    confidence: "high",
    steps: workflow.operations.map((operation) => ({
      operation,
      explanation: "Saved workflow operation",
    })),
  };
}
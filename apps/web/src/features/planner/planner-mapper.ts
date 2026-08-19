import type { GeneratedPlan } from "./planner-types";
import type { PlannerResponse } from "./planner-api";

export function mapPlannerResponse(
  response: PlannerResponse,
): GeneratedPlan {
  return {
    confidence: response.confidence,

    steps: response.steps.map((step) => {
      const metadata = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };

      switch (step.type) {
        case "rename_column":
          return {
            explanation: step.explanation,
            operation: {
              ...metadata,
              type: step.type,
              payload: step.payload,
            },
          };

        case "trim_whitespace":
          return {
            explanation: step.explanation,
            operation: {
              ...metadata,
              type: step.type,
              payload: step.payload,
            },
          };

        case "replace_text":
          return {
            explanation: step.explanation,
            operation: {
              ...metadata,
              type: step.type,
              payload: step.payload,
            },
          };

        case "uppercase":
          return {
            explanation: step.explanation,
            operation: {
              ...metadata,
              type: step.type,
              payload: step.payload,
            },
          };

        case "delete_column":
          return {
            explanation: step.explanation,
            operation: {
              ...metadata,
              type: step.type,
              payload: step.payload,
            },
          };
      }
    }),
  };
}
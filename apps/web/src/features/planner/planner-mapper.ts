import type { GeneratedPlan } from "./planner-types";
import type { PlannerResponse } from "./planner-api";

export function mapPlannerResponse(
  response: PlannerResponse,
): GeneratedPlan {
  return {
    confidence: response.confidence,

    steps: response.steps.map((step) => ({
      explanation: step.explanation,

      operation: {
        id: crypto.randomUUID(),
        timestamp: Date.now(),

        type: step.type,

        payload: step.payload,
      },
    })),
  };
}
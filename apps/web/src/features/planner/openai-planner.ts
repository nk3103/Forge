import type { Dataset } from "@/features/dataset/types";

import type { Planner } from "./planner";
import type {
  PlannerRequest,
  PlannerResponse,
} from "./planner-api";
import type { GeneratedPlan } from "./planner-types";
import { mapPlannerResponse } from "./planner-mapper";

export class OpenAIPlanner
  implements Planner
{
  async generatePlan(
    dataset: Dataset,
    prompt: string,
  ): Promise<GeneratedPlan> {
    const request: PlannerRequest = {
    columns: dataset.columns,
    sampleRows: dataset.rows.slice(0, 5),
    prompt,
};

    const response = await fetch(
      "/api/planner",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(request),
      },
    );

    const result =
      (await response.json()) as PlannerResponse;

    const plannerResponse =
    (await response.json()) as PlannerResponse;

return mapPlannerResponse(
    plannerResponse,
);

return mapPlannerResponse(
    plannerResponse,
);
  }
}
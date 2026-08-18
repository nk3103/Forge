import type { Dataset } from "@/features/dataset/types";

import type { GeneratedPlan } from "./planner-types";

export interface Planner {
  generatePlan(
    dataset: Dataset,
    prompt: string,
  ): Promise<GeneratedPlan>;
}
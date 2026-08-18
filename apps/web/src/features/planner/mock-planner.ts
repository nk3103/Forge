import type { Dataset } from "@/features/dataset/types";

import type { Planner } from "./planner";
import type { GeneratedPlan } from "./planner-types";

export class MockPlanner implements Planner {
  async generatePlan(
    dataset: Dataset,
    prompt: string,
  ): Promise<GeneratedPlan> {
    if (
      prompt.trim().toLowerCase() !==
      "rename name to full name"
    ) {
      return {
        confidence: "low",
        steps: [],
      };
    }

    const hasNameColumn =
      dataset.columns.includes("NAME");

    if (!hasNameColumn) {
      return {
        confidence: "low",
        steps: [],
      };
    }

    return {
      confidence: "high",
      steps: [
        {
          explanation:
            "Rename the NAME column to Full Name.",

          operation: {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            type: "rename_column",
            payload: {
              from: "NAME",
              to: "Full Name",
            },
          },
        },
      ],
    };
  }
}
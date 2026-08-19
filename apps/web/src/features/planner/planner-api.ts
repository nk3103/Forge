import type { DatasetRow } from "@/features/dataset/types";

export interface PlannerRequest {
  columns: string[];
  sampleRows: DatasetRow[];
  prompt: string;
}

export interface PlannerResponse {
  confidence: "high" | "medium" | "low";
  steps: PlannerStepDto[];
}

export type PlannerStepDto =
  | {
      type: "rename_column";
      payload: {
        from: string;
        to: string;
      };
      explanation: string;
    }
  | {
      type: "trim_whitespace";
      payload: {
        column: string;
      };
      explanation: string;
    }
  | {
      type: "replace_text";
      payload: {
        column: string;
        find: string;
        replace: string;
      };
      explanation: string;
    }
  | {
      type: "uppercase";
      payload: {
        column: string;
      };
      explanation: string;
    }
  | {
      type: "delete_column";
      payload: {
        column: string;
      };
      explanation: string;
    };
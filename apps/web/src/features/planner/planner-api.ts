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

export interface PlannerStepDto {
  type: "rename_column";
  payload: {
    from: string;
    to: string;
  };
  explanation: string;
}
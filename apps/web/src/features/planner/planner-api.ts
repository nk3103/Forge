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
      type: "lowercase";
      payload: {
        column: string;
      };
      explanation: string;
    }
  | {
      type: "title_case";
      payload: {
        column: string;
      };
      explanation: string;
    }
  | {
      type: "fill_missing_values";
      payload: {
        column: string;
        value: string;
      };
      explanation: string;
    }
  | {
      type: "remove_empty_rows";
      payload: Record<string, never>;
      explanation: string;
    }
  | {
      type: "concatenate_columns";
      payload: {
        columns: string[];
        separator: string;
        destination: string;
      };
      explanation: string;
    }
  | {
      type: "split_column";
      payload: {
        column: string;
        separator: string;
        destinations: string[];
      };
      explanation: string;
    }
  | {
      type: "round_numbers";
      payload: {
        column: string;
        decimals: number;
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
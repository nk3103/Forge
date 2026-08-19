import type { Operation } from "@/features/operations/operation-types";

export interface PlanStep {
  operation: Operation;
  explanation: string;
}

export interface GeneratedPlan {
  steps: PlanStep[];
  confidence: "high" | "medium" | "low";
  sourcePrompt?: string;
}
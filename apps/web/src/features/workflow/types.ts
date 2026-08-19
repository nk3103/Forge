import type { Operation } from "@/features/operations/operation-types";

export type DatasetColumnType =
  | "string"
  | "number"
  | "boolean"
  | "empty"
  | "unknown";

export interface DatasetSignature {
  originalColumns: string[];
  normalizedColumns: string[];
  columnCount: number;
  columnTypes: Record<string, DatasetColumnType>;
}

export interface WorkflowMetadata {
  id: string;
  name: string;
  description?: string;
}

export interface Workflow {
  metadata: WorkflowMetadata;
  operations: Operation[];
  createdAt: number;
  updatedAt: number;
  sourcePrompt: string;
  datasetSignature: DatasetSignature;
  usageCount: number;
  version: number;
}

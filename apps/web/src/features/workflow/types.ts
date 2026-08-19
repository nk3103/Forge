import type { Operation } from "@/features/operations/operation-types";

export type DatasetSignature = string;

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

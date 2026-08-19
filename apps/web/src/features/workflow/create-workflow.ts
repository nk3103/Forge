import type { Operation } from "@/features/operations/operation-types";

import type {
  DatasetSignature,
  Workflow,
} from "./types";

export interface CreateWorkflowInput {
  name: string;
  description?: string;
  operations: Operation[];
  sourcePrompt: string;
  datasetSignature: DatasetSignature;
  id?: string;
  createdAt?: number;
  updatedAt?: number;
  usageCount?: number;
  version?: number;
}

export function createWorkflow(
  input: CreateWorkflowInput,
): Workflow {
  const createdAt = input.createdAt ?? Date.now();

  return {
    metadata: {
      id: input.id ?? crypto.randomUUID(),
      name: input.name,
      ...(input.description !== undefined
        ? { description: input.description }
        : {}),
    },
    operations: input.operations,
    createdAt,
    updatedAt: input.updatedAt ?? createdAt,
    sourcePrompt: input.sourcePrompt,
    datasetSignature: input.datasetSignature,
    usageCount: input.usageCount ?? 0,
    version: input.version ?? 1,
  };
}

import type { Operation } from "@/features/operations/operation-types";

export interface LearnedWorkflow {
  id: string;

  datasetSignature: string;

  operations: Operation[];
}

const workflows: LearnedWorkflow[] = [];

export function rememberWorkflow(
  workflow: LearnedWorkflow,
) {
  workflows.push(workflow);
}

export function findWorkflow(
  datasetSignature: string,
): LearnedWorkflow | undefined {
  return workflows.find(
    (workflow) =>
      workflow.datasetSignature === datasetSignature,
  );
}

export function clearKnowledge() {
  workflows.length = 0;
}
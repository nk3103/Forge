import type { Dataset } from "@/features/dataset/types";
import { createDatasetSignature } from "./dataset-signature";
import type { DatasetSignature, Workflow } from "@/features/workflow/types";

export interface WorkflowMatch {
  workflow: Workflow;
  score: number;
}

export function findBestWorkflowMatch(
  dataset: Dataset,
  workflows: Workflow[],
): WorkflowMatch | null {
  const signature = createDatasetSignature(dataset);
  const best = workflows
    .map((workflow) => ({
      workflow,
      score: scoreWorkflow(signature, workflow.datasetSignature),
    }))
    .sort((left, right) => right.score - left.score)[0];

  return best && best.score >= 0.75 ? best : null;
}

export function scoreWorkflow(
  current: DatasetSignature,
  saved: DatasetSignature,
): number {
  const currentColumns = new Set(current.normalizedColumns);
  const savedColumns = new Set(saved.normalizedColumns);
  const overlap = Array.from(currentColumns).filter((column) =>
    savedColumns.has(column),
  ).length;
  const denominator = Math.max(
    currentColumns.size,
    savedColumns.size,
  );
  const columnOverlap = denominator === 0 ? 1 : overlap / denominator;
  const countSimilarity = similarity(
    current.columnCount,
    saved.columnCount,
  );
  const typeMatches = Array.from(currentColumns).filter(
    (column) =>
      savedColumns.has(column) &&
      current.columnTypes[column] === saved.columnTypes[column],
  ).length;
  const typeSimilarity = overlap === 0 ? 0 : typeMatches / overlap;

  return (
    columnOverlap * 0.6 +
    countSimilarity * 0.25 +
    typeSimilarity * 0.15
  );
}

function similarity(left: number, right: number): number {
  const denominator = Math.max(left, right);

  return denominator === 0
    ? 1
    : 1 - Math.abs(left - right) / denominator;
}
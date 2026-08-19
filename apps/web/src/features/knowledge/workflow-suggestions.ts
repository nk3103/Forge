import type { Dataset } from "@/features/dataset/types";

import {
  createDatasetSignature,
  datasetSignatureKey,
} from "./dataset-signature";
import {
  findWorkflow,
  type LearnedWorkflow,
} from "./workflow-knowledge";

export function suggestWorkflow(
  dataset: Dataset,
): LearnedWorkflow | undefined {
  const signature =
    datasetSignatureKey(
      createDatasetSignature(dataset),
    );

  return findWorkflow(signature);
}
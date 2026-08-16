import type { Dataset } from "@/features/dataset/types";

import { createDatasetSignature } from "./dataset-signature";
import {
  findWorkflow,
  type LearnedWorkflow,
} from "./workflow-knowledge";

export function suggestWorkflow(
  dataset: Dataset,
): LearnedWorkflow | undefined {
  const signature =
    createDatasetSignature(dataset);

  return findWorkflow(signature);
}
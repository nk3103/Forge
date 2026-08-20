import type { Operation } from "@/features/operations/operation-types";

import type { Dataset } from "../../types";

export interface ForgeState {
  dataset?: Dataset;
  operations: Operation[];

  setDataset: (dataset: Dataset) => void;
  applyOperation: (operation: Operation) => void;
  reset: () => void;
}

import type { Dataset } from "@/features/dataset/types";

import type { TitleCaseOperation } from "../operation-types";
import { applyCaseTransform, toTitleCase } from "./case-transform";

export function applyTitleCase(
  dataset: Dataset,
  operation: TitleCaseOperation,
): Dataset {
  return applyCaseTransform(
    dataset,
    operation.payload.column,
    toTitleCase,
  );
}
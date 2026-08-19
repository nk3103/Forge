import type { Dataset } from "@/features/dataset/types";

import type { LowercaseOperation } from "../operation-types";
import { applyCaseTransform } from "./case-transform";

export function applyLowercase(
  dataset: Dataset,
  operation: LowercaseOperation,
): Dataset {
  return applyCaseTransform(
    dataset,
    operation.payload.column,
    (value) => value.toLowerCase(),
  );
}
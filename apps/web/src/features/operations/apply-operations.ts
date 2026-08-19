import type { Dataset } from "@/features/dataset/types";

import type { Operation } from "./operation-types";

import { applyRenameColumn } from "./executors/rename-column";
import { applyTrimWhitespace } from "./executors/trim-whitespace";
import { applyReplaceText } from "./executors/replace-text";
import { applyUppercase } from "./executors/uppercase";
import { applyDeleteColumn } from "./executors/delete-column";

function assertNever(value: never): never {
  throw new Error(
    `Unhandled operation: ${JSON.stringify(value)}`,
  );
}

export function applyOperations(
  originalDataset: Dataset,
  operations: Operation[],
): Dataset {
  return operations.reduce((dataset, operation) => {
    switch (operation.type) {
      case "rename_column":
        return applyRenameColumn(
          dataset,
          operation,
        );

      case "trim_whitespace":
        return applyTrimWhitespace(
          dataset,
          operation,
        );

      case "replace_text":
        return applyReplaceText(
          dataset,
          operation,
        );

      case "uppercase":
        return applyUppercase(
          dataset,
          operation,
        );

        case "delete_column":
            return applyDeleteColumn(
            dataset,
            operation,
            );

      default:
        return assertNever(operation);
    }
  }, originalDataset);
}
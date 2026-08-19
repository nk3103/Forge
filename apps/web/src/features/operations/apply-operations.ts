import type { Dataset } from "@/features/dataset/types";

import type { Operation } from "./operation-types";

import { applyRenameColumn } from "./executors/rename-column";
import { applyTrimWhitespace } from "./executors/trim-whitespace";
import { applyReplaceText } from "./executors/replace-text";
import { applyUppercase } from "./executors/uppercase";
import { applyLowercase } from "./executors/lowercase";
import { applyTitleCase } from "./executors/title-case";
import { applyFillMissingValues } from "./executors/fill-missing-values";
import { applyRemoveEmptyRows } from "./executors/remove-empty-rows";
import { applyConcatenateColumns } from "./executors/concatenate-columns";
import { applySplitColumn } from "./executors/split-column";
import { applyRoundNumbers } from "./executors/round-numbers";
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

      case "lowercase":
        return applyLowercase(
          dataset,
          operation,
        );

      case "title_case":
        return applyTitleCase(
          dataset,
          operation,
        );

      case "fill_missing_values":
        return applyFillMissingValues(
          dataset,
          operation,
        );

      case "remove_empty_rows":
        return applyRemoveEmptyRows(
          dataset,
          operation,
        );

      case "concatenate_columns":
        return applyConcatenateColumns(
          dataset,
          operation,
        );

      case "split_column":
        return applySplitColumn(
          dataset,
          operation,
        );

      case "round_numbers":
        return applyRoundNumbers(
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
"use client";

import type { Operation } from "@/features/operations/operation-types";

import { RenameColumnEditor } from "./rename-column-editor";
import { CaseOperationEditor } from "./case-operation-editor";
import { FillMissingValuesEditor } from "./fill-missing-values-editor";
import { RemoveEmptyRowsEditor } from "./remove-empty-rows-editor";
import { ConcatenateColumnsEditor } from "./concatenate-columns-editor";
import { SplitColumnEditor } from "./split-column-editor";
import { RoundNumbersEditor } from "./round-numbers-editor";

interface OperationEditorProps {
  operation: Operation;
  onChange: (
    operation: Operation,
  ) => void;
}

export function OperationEditor({
  operation,
  onChange,
}: OperationEditorProps) {
  switch (operation.type) {
    case "rename_column":
      return (
        <RenameColumnEditor
          operation={operation}
          onChange={onChange}
        />
      );

    case "uppercase":
    case "lowercase":
    case "title_case":
      return (
        <CaseOperationEditor
          operation={operation}
          onChange={onChange}
        />
      );

    case "fill_missing_values":
      return (
        <FillMissingValuesEditor
          operation={operation}
          onChange={onChange}
        />
      );

    case "remove_empty_rows":
      return (
        <RemoveEmptyRowsEditor
          operation={operation}
          onChange={onChange}
        />
      );

    case "concatenate_columns":
      return (
        <ConcatenateColumnsEditor
          operation={operation}
          onChange={onChange}
        />
      );

    case "split_column":
      return (
        <SplitColumnEditor
          operation={operation}
          onChange={onChange}
        />
      );

    case "round_numbers":
      return (
        <RoundNumbersEditor
          operation={operation}
          onChange={onChange}
        />
      );
  }
}
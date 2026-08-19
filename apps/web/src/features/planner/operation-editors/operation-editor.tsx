"use client";

import type { Operation } from "@/features/operations/operation-types";

import { RenameColumnEditor } from "./rename-column-editor";

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
  }
}
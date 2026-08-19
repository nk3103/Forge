"use client";

import type {
  Operation,
  RemoveEmptyRowsOperation,
} from "@/features/operations/operation-types";

interface RemoveEmptyRowsEditorProps {
  operation: RemoveEmptyRowsOperation;
  onChange: (operation: Operation) => void;
}

export function RemoveEmptyRowsEditor(
  { operation, onChange }: RemoveEmptyRowsEditorProps,
) {
  void onChange;

  return (
    <p
      className="text-sm text-muted-foreground"
      data-operation={operation.type}
    >
      This operation applies to all columns and has no settings to edit.
    </p>
  );
}
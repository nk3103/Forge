"use client";

import { Input } from "@/components/ui/input";

import type {
  LowercaseOperation,
  Operation,
  TitleCaseOperation,
  UppercaseOperation,
} from "@/features/operations/operation-types";

type CaseOperation =
  | UppercaseOperation
  | LowercaseOperation
  | TitleCaseOperation;

interface CaseOperationEditorProps {
  operation: CaseOperation;
  onChange: (operation: Operation) => void;
}

export function CaseOperationEditor({
  operation,
  onChange,
}: CaseOperationEditorProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">
        Column
      </label>

      <Input
        value={operation.payload.column}
        onChange={(event) =>
          onChange({
            ...operation,
            payload: {
              column: event.target.value,
            },
          })
        }
      />
    </div>
  );
}
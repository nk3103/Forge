"use client";

import { Input } from "@/components/ui/input";

import type {
  FillMissingValuesOperation,
  Operation,
} from "@/features/operations/operation-types";

interface FillMissingValuesEditorProps {
  operation: FillMissingValuesOperation;
  onChange: (operation: Operation) => void;
}

export function FillMissingValuesEditor({
  operation,
  onChange,
}: FillMissingValuesEditorProps) {
  return (
    <div className="space-y-4">
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
                ...operation.payload,
                column: event.target.value,
              },
            })
          }
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Fill with
        </label>

        <Input
          value={operation.payload.value}
          onChange={(event) =>
            onChange({
              ...operation,
              payload: {
                ...operation.payload,
                value: event.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );
}
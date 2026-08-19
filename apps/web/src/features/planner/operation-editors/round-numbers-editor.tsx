"use client";

import { Input } from "@/components/ui/input";

import type {
  Operation,
  RoundNumbersOperation,
} from "@/features/operations/operation-types";

interface RoundNumbersEditorProps {
  operation: RoundNumbersOperation;
  onChange: (operation: Operation) => void;
}

export function RoundNumbersEditor({
  operation,
  onChange,
}: RoundNumbersEditorProps) {
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
          Decimal places
        </label>

        <Input
          type="number"
          min={0}
          step={1}
          value={operation.payload.decimals}
          onChange={(event) =>
            onChange({
              ...operation,
              payload: {
                ...operation.payload,
                decimals: Number(event.target.value),
              },
            })
          }
        />
      </div>
    </div>
  );
}
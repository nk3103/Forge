"use client";

import { Input } from "@/components/ui/input";

import type { RenameColumnOperation } from "@/features/operations/operation-types";

interface RenameColumnEditorProps {
  operation: RenameColumnOperation;
  onChange: (
    operation: RenameColumnOperation,
  ) => void;
}

export function RenameColumnEditor({
  operation,
  onChange,
}: RenameColumnEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">
          From
        </label>

        <Input
          value={operation.payload.from}
          disabled
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          To
        </label>

        <Input
          value={operation.payload.to}
          onChange={(event) =>
            onChange({
              ...operation,
              payload: {
                ...operation.payload,
                to: event.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );
}
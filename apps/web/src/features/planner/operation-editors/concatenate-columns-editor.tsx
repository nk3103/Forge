"use client";

import { Input } from "@/components/ui/input";

import type {
  ConcatenateColumnsOperation,
  Operation,
} from "@/features/operations/operation-types";

interface ConcatenateColumnsEditorProps {
  operation: ConcatenateColumnsOperation;
  onChange: (operation: Operation) => void;
}

export function ConcatenateColumnsEditor({
  operation,
  onChange,
}: ConcatenateColumnsEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">
          Columns
        </label>

        <Input
          value={operation.payload.columns.join(", ")}
          onChange={(event) =>
            onChange({
              ...operation,
              payload: {
                ...operation.payload,
                columns: event.target.value
                  .split(",")
                  .map((column) => column.trim())
                  .filter(Boolean),
              },
            })
          }
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Separator
        </label>

        <Input
          value={operation.payload.separator}
          onChange={(event) =>
            onChange({
              ...operation,
              payload: {
                ...operation.payload,
                separator: event.target.value,
              },
            })
          }
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Destination
        </label>

        <Input
          value={operation.payload.destination}
          onChange={(event) =>
            onChange({
              ...operation,
              payload: {
                ...operation.payload,
                destination: event.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );
}
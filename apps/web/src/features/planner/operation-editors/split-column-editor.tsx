"use client";

import { Input } from "@/components/ui/input";

import type {
  Operation,
  SplitColumnOperation,
} from "@/features/operations/operation-types";

interface SplitColumnEditorProps {
  operation: SplitColumnOperation;
  onChange: (operation: Operation) => void;
}

export function SplitColumnEditor({
  operation,
  onChange,
}: SplitColumnEditorProps) {
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
          Destinations
        </label>

        <Input
          value={operation.payload.destinations.join(", ")}
          onChange={(event) =>
            onChange({
              ...operation,
              payload: {
                ...operation.payload,
                destinations: event.target.value
                  .split(",")
                  .map((destination) => destination.trim())
                  .filter(Boolean),
              },
            })
          }
        />
      </div>
    </div>
  );
}
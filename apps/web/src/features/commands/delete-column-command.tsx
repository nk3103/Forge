"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import type {
  DeleteColumnOperation,
  Operation,
} from "@/features/operations/operation-types";

interface DeleteColumnCommandProps {
  columns: string[];
  onSubmit: (operation: Operation) => void;
}

export function DeleteColumnCommand({
  columns,
  onSubmit,
}: DeleteColumnCommandProps) {
  const [column, setColumn] = useState(columns[0] ?? "");

  const selectedColumn = columns.includes(column)
    ? column
    : columns[0] ?? "";

  function handleSubmit() {
    if (!selectedColumn) return;

    const operation: DeleteColumnOperation = {
      id: crypto.randomUUID(),
      type: "delete_column",
      timestamp: Date.now(),
      payload: { column: selectedColumn },
    };

    onSubmit(operation);
  }

  return (
    <div className="space-y-4 border-t pt-8">
      <div>
        <h4 className="font-medium">Delete a column</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Remove the column and its values from the dataset.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Column</label>
        <select
          value={selectedColumn}
          onChange={(event) => setColumn(event.target.value)}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
        >
          {columns.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <Button
        variant="destructive"
        onClick={handleSubmit}
        disabled={!column}
      >
        Delete Column
      </Button>
    </div>
  );
}
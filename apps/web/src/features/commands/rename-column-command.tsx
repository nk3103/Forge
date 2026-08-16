"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import type { RenameColumnOperation } from "@/features/operations/operation-types";

interface RenameColumnCommandProps {
  columns: string[];
  onSubmit: (operation: RenameColumnOperation) => void;
}

export function RenameColumnCommand({
  columns,
  onSubmit,
}: RenameColumnCommandProps) {
  const [from, setFrom] = useState(columns[0] ?? "");
  const [to, setTo] = useState("");

  useEffect(() => {
    if (!columns.includes(from)) {
      setFrom(columns[0] ?? "");
    }
  }, [columns, from]);

  const trimmed = to.trim();

  const canSubmit = useMemo(() => {
    if (!from) return false;

    if (!trimmed) return false;

    if (trimmed === from) return false;

    if (columns.includes(trimmed)) return false;

    return true;
  }, [columns, from, trimmed]);

  function handleSubmit() {
    if (!canSubmit) return;

    onSubmit({
      id: crypto.randomUUID(),
      type: "rename_column",
      timestamp: Date.now(),
      payload: {
        from,
        to: trimmed,
      },
    });

    setFrom(trimmed);
    setTo("");
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Column
        </label>

        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
        >
          {columns.map((column) => (
            <option
              key={column}
              value={column}
            >
              {column}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          New Name
        </label>

        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Full Name"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
        />

        {trimmed && columns.includes(trimmed) && trimmed !== from && (
          <p className="text-sm text-destructive">
            A column with this name already exists.
          </p>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        Apply Transformation
      </Button>
    </div>
  );
}
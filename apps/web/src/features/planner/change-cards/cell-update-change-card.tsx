"use client";

import type { CellUpdateChange } from "@/features/dataset/diff/dataset-diff";

interface CellUpdateChangeCardProps {
  change: CellUpdateChange;
}

export function CellUpdateChangeCard({
  change,
}: CellUpdateChangeCardProps) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="font-medium">
        Cell Updated
      </div>

      <div className="mt-1 text-sm text-muted-foreground">
        Row {change.rowIndex + 1}
      </div>

      <div className="mt-2 text-sm">
        "{String(change.before)}"
      </div>

      <div className="text-sm">
        ↓
      </div>

      <div className="text-sm">
        "{String(change.after)}"
      </div>
    </div>
  );
}
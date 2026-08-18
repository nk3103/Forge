"use client";

import type { RenameColumnChange } from "@/features/dataset/diff/dataset-diff";

interface RenameChangeCardProps {
  change: RenameColumnChange;
}

export function RenameChangeCard({
  change,
}: RenameChangeCardProps) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="font-medium">
        Column Renamed
      </div>

      <div className="mt-1 text-sm text-muted-foreground">
        {change.from} → {change.to}
      </div>
    </div>
  );
}
"use client";

import type { DeleteColumnChange } from "@/features/dataset/diff/dataset-diff";

interface DeleteChangeCardProps {
  change: DeleteColumnChange;
}

export function DeleteChangeCard({
  change,
}: DeleteChangeCardProps) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="min-w-0">
        <div className="font-medium">
          Column removed
        </div>
        <div className="text-sm text-muted-foreground">
          {change.column}
        </div>
      </div>
    </div>
  );
}
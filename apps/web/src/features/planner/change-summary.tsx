"use client";

import type { DatasetDiff } from "@/features/dataset/diff/dataset-diff";

import { ChangeCard } from "./change-card";

interface ChangeSummaryProps {
  diff: DatasetDiff;
}

export function ChangeSummary({
  diff,
}: ChangeSummaryProps) {
  if (diff.changes.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-xl border bg-muted/30 p-5">
      <div className="flex items-end justify-between border-b pb-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Review
          </p>
          <h4 className="mt-1 text-lg font-semibold">
            Expected changes
          </h4>
        </div>
        <p className="text-sm text-muted-foreground">
          {diff.changes.length} items
        </p>
      </div>

      <div className="space-y-2">
        {diff.changes.map((change, index) => (
          <ChangeCard
            key={index}
            change={change}
          />
        ))}
      </div>
    </section>
  );
}
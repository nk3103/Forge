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
      <div>
        <h4 className="font-semibold">
          Expected Changes
        </h4>

        <p className="text-sm text-muted-foreground">
          Here's what Forge will change.
        </p>
      </div>

      <div className="space-y-3">
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
"use client";

import type { Dataset } from "@/features/dataset/types";
import type { RenameColumnOperation } from "@/features/operations/operation-types";

import { RenameColumnCommand } from "./rename-column-command";

interface CommandBarProps {
  dataset: Dataset;
  onOperation: (operation: RenameColumnOperation) => void;
}

export function CommandBar({
  dataset,
  onOperation,
}: CommandBarProps) {
  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          Transform Dataset
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Teach Forge how you transform your data.
        </p>
      </div>

      <RenameColumnCommand
        columns={dataset.columns}
        onSubmit={onOperation}
      />
    </section>
  );
}
"use client";

import type { DatasetChange } from "@/features/dataset/diff/dataset-diff";

import { RenameChangeCard } from "./change-cards/rename-change-card";
import { DeleteChangeCard } from "./change-cards/delete-change-card";
import { CellUpdateChangeCard } from "./change-cards/cell-update-change-card";

interface ChangeCardProps {
  change: DatasetChange;
}

export function ChangeCard({
  change,
}: ChangeCardProps) {
  switch (change.type) {
    case "rename_column":
      return (
        <RenameChangeCard
          change={change}
        />
      );

    case "cell_update":
      return (
        <CellUpdateChangeCard
          change={change}
        />
      );

    case "delete_column":
      return <DeleteChangeCard change={change} />;
  }
}
import type { Dataset } from "../types";

interface DatasetHeaderProps {
  dataset: Dataset;
}

export function DatasetHeader({ dataset }: DatasetHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          {dataset.name}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {dataset.rows.length.toLocaleString()} rows •{" "}
          {dataset.columns.length} columns
        </p>
      </div>
    </div>
  );
}
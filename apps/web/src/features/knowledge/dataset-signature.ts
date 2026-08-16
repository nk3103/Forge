import type { Dataset } from "@/features/dataset/types";

export function createDatasetSignature(
  dataset: Dataset,
): string {
  return [...dataset.columns]
    .map((column) => column.trim().toLowerCase())
    .sort()
    .join("|");
}
import type { Dataset } from "@/features/dataset/types";
import type {
  DatasetColumnType,
  DatasetSignature,
} from "@/features/workflow/types";

export function createDatasetSignature(
  dataset: Dataset,
): DatasetSignature {
  const columns = dataset.columns
    .map((column) => column.trim().toLowerCase())
    .sort();

  const columnTypes = Object.fromEntries(
    dataset.columns.map((column) => [
      column.trim().toLowerCase(),
      inferColumnType(dataset, column),
    ]),
  );

  return {
    columns,
    columnCount: columns.length,
    columnTypes,
  };
}

function inferColumnType(
  dataset: Dataset,
  column: string,
): DatasetColumnType {
  const values = dataset.rows
    .map((row) => row[column])
    .filter(
      (value) =>
        value !== null &&
        value !== undefined &&
        value !== "",
    );

  if (values.length === 0) return "empty";

  const types = new Set(
    values.map((value) => {
      if (typeof value === "string") return "string";
      if (typeof value === "number") return "number";
      if (typeof value === "boolean") return "boolean";
      return "unknown";
    }),
  );

  return types.size === 1
    ? (Array.from(types)[0] as DatasetColumnType)
    : "unknown";
}

export function datasetSignatureKey(
  signature: DatasetSignature,
): string {
  return signature.columns.join("|");
}
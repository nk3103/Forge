import type { Dataset } from "@/features/dataset/types";

export function applyCaseTransform(
  dataset: Dataset,
  column: string,
  transform: (value: string) => string,
): Dataset {
  return {
    ...dataset,
    rows: dataset.rows.map((row) => {
      const value = row[column];

      return {
        ...row,
        [column]:
          typeof value === "string"
            ? transform(value)
            : value,
      };
    }),
  };
}

export function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .replace(
      /(^|\s)(\p{L})/gu,
      (_match, boundary: string, letter: string) =>
        `${boundary}${letter.toUpperCase()}`,
    );
}
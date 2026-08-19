import { describe, expect, it } from "vitest";

import {
  createDatasetSignature,
  normalizeColumnName,
} from "./dataset-signature";

describe("Dataset Signature", () => {
  it("ignores column order", () => {
    const first = createDatasetSignature({
      id: "1",
      name: "employees.csv",
      columns: ["NAME", "AGE"],
      rows: [],
    });
    const second = createDatasetSignature({
      id: "2",
      name: "employees.csv",
      columns: ["AGE", "NAME"],
      rows: [],
    });

    expect(first.normalizedColumns).toEqual(
      second.normalizedColumns,
    );
  });

  it("ignores casing", () => {
    const first = createDatasetSignature({
      id: "1",
      name: "",
      columns: ["Name"],
      rows: [],
    });
    const second = createDatasetSignature({
      id: "2",
      name: "",
      columns: ["name"],
      rows: [],
    });

    expect(first.normalizedColumns).toEqual(
      second.normalizedColumns,
    );
  });

  it("normalizes separators and repeated spaces", () => {
    expect(normalizeColumnName("  First_Name -  ID  ")).toBe(
      "first name id",
    );
  });
});
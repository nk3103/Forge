import { describe, expect, it } from "vitest";

import { createDatasetSignature } from "./dataset-signature";

describe("Dataset Signature", () => {
  it("ignores column order", () => {
    expect(
      createDatasetSignature({
        id: "1",
        name: "employees.csv",
        columns: ["NAME", "AGE"],
        rows: [],
      }),
    ).toBe(
      createDatasetSignature({
        id: "2",
        name: "employees.csv",
        columns: ["AGE", "NAME"],
        rows: [],
      }),
    );
  });

  it("ignores casing", () => {
    expect(
      createDatasetSignature({
        id: "1",
        name: "",
        columns: ["Name"],
        rows: [],
      }),
    ).toBe(
      createDatasetSignature({
        id: "2",
        name: "",
        columns: ["name"],
        rows: [],
      }),
    );
  });
});
import { describe, expect, it } from "vitest";

import { applyOperations } from "../apply-operations";

import type { Dataset } from "@/features/dataset/types";
import type { RenameColumnOperation } from "../operation-types";

describe("Transformation Engine", () => {
  const dataset: Dataset = {
    id: "dataset-1",
    name: "employees.csv",

    columns: ["NAME", "AGE"],

    rows: [
      {
        NAME: "Alice",
        AGE: "24",
      },
      {
        NAME: "Bob",
        AGE: "30",
      },
    ],
  };

  it("returns the original dataset when no operations are provided", () => {
    const result = applyOperations(dataset, []);

    expect(result).toEqual(dataset);
  });

  it("renames a column", () => {
    const operation: RenameColumnOperation = {
      id: "operation-1",
      type: "rename_column",
      timestamp: Date.now(),

      payload: {
        from: "NAME",
        to: "FULL_NAME",
      },
    };

    const result = applyOperations(dataset, [operation]);

    expect(result.columns).toEqual([
      "FULL_NAME",
      "AGE",
    ]);

    expect(result.rows).toEqual([
      {
        FULL_NAME: "Alice",
        AGE: "24",
      },
      {
        FULL_NAME: "Bob",
        AGE: "30",
      },
    ]);
  });

  it("does not mutate the original dataset", () => {
    const operation: RenameColumnOperation = {
      id: "operation-1",
      type: "rename_column",
      timestamp: Date.now(),

      payload: {
        from: "NAME",
        to: "FULL_NAME",
      },
    };

    applyOperations(dataset, [operation]);

    expect(dataset.columns).toEqual([
      "NAME",
      "AGE",
    ]);

    expect(dataset.rows).toEqual([
      {
        NAME: "Alice",
        AGE: "24",
      },
      {
        NAME: "Bob",
        AGE: "30",
      },
    ]);
  });

  it("ignores renaming a column that does not exist", () => {
    const operation: RenameColumnOperation = {
      id: "operation-1",
      type: "rename_column",
      timestamp: Date.now(),

      payload: {
        from: "EMAIL",
        to: "WORK_EMAIL",
      },
    };

    const result = applyOperations(dataset, [operation]);

    expect(result).toEqual(dataset);
  });
});
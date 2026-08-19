import { describe, expect, it } from "vitest";

import { applyOperations } from "../apply-operations";

import type { Dataset } from "@/features/dataset/types";
import type {
  DeleteColumnOperation,
  ReplaceTextOperation,
  RenameColumnOperation,
  UppercaseOperation,
} from "../operation-types";

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

  it("deletes a column and its row values", () => {
    const operation: DeleteColumnOperation = {
      id: "operation-1",
      type: "delete_column",
      timestamp: Date.now(),
      payload: {
        column: "AGE",
      },
    };

    const result = applyOperations(dataset, [operation]);

    expect(result.columns).toEqual(["NAME"]);
    expect(result.rows).toEqual([
      { NAME: "Alice" },
      { NAME: "Bob" },
    ]);
    expect(dataset.columns).toEqual(["NAME", "AGE"]);
    expect(dataset.rows[0]).toEqual({
      NAME: "Alice",
      AGE: "24",
    });
  });

  it("replaces every occurrence in string values only", () => {
    const replaceDataset: Dataset = {
      ...dataset,
      columns: ["DESCRIPTION", "COUNT", "EMPTY"],
      rows: [
        {
          DESCRIPTION: "red-red-blue",
          COUNT: 2,
          EMPTY: null,
        },
        {
          DESCRIPTION: "green",
          COUNT: false,
          EMPTY: undefined,
        },
      ],
    };
    const operation: ReplaceTextOperation = {
      id: "operation-2",
      type: "replace_text",
      timestamp: Date.now(),
      payload: {
        column: "DESCRIPTION",
        find: "red",
        replace: "orange",
      },
    };

    const result = applyOperations(replaceDataset, [operation]);

    expect(result.rows).toEqual([
      {
        DESCRIPTION: "orange-orange-blue",
        COUNT: 2,
        EMPTY: null,
      },
      {
        DESCRIPTION: "green",
        COUNT: false,
        EMPTY: undefined,
      },
    ]);
    expect(replaceDataset.rows[0].DESCRIPTION).toBe("red-red-blue");
  });

  it("uppercases string values and preserves non-string values", () => {
    const uppercaseDataset: Dataset = {
      ...dataset,
      columns: ["VALUE"],
      rows: [
        { VALUE: "Hello, Forge!" },
        { VALUE: null },
        { VALUE: 42 },
        { VALUE: false },
        { VALUE: undefined },
      ],
    };
    const operation: UppercaseOperation = {
      id: "operation-3",
      type: "uppercase",
      timestamp: Date.now(),
      payload: {
        column: "VALUE",
      },
    };

    const result = applyOperations(uppercaseDataset, [operation]);

    expect(result.rows).toEqual([
      { VALUE: "HELLO, FORGE!" },
      { VALUE: null },
      { VALUE: 42 },
      { VALUE: false },
      { VALUE: undefined },
    ]);
    expect(uppercaseDataset.rows[0].VALUE).toBe("Hello, Forge!");
  });
});
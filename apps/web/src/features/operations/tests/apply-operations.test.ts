import { describe, expect, it } from "vitest";

import { applyOperations } from "../apply-operations";

import type { Dataset } from "@/features/dataset/types";
import type {
  DeleteColumnOperation,
  LowercaseOperation,
  FillMissingValuesOperation,
  RemoveEmptyRowsOperation,
  ConcatenateColumnsOperation,
  SplitColumnOperation,
  RoundNumbersOperation,
  TitleCaseOperation,
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

  it("lowercases string values and preserves non-string values", () => {
    const lowercaseDataset: Dataset = {
      ...dataset,
      columns: ["VALUE"],
      rows: [
        { VALUE: "Hello, FORGE!" },
        { VALUE: null },
        { VALUE: 42 },
        { VALUE: false },
        { VALUE: undefined },
      ],
    };
    const operation: LowercaseOperation = {
      id: "operation-4",
      type: "lowercase",
      timestamp: Date.now(),
      payload: {
        column: "VALUE",
      },
    };

    const result = applyOperations(lowercaseDataset, [operation]);

    expect(result.rows).toEqual([
      { VALUE: "hello, forge!" },
      { VALUE: null },
      { VALUE: 42 },
      { VALUE: false },
      { VALUE: undefined },
    ]);
    expect(lowercaseDataset.rows[0].VALUE).toBe("Hello, FORGE!");
  });

  it("title cases words and preserves non-string values", () => {
    const titleCaseDataset: Dataset = {
      ...dataset,
      columns: ["VALUE"],
      rows: [
        { VALUE: "john doe" },
        { VALUE: "HELLO WORLD" },
        { VALUE: "mARY ann" },
        { VALUE: null },
        { VALUE: 42 },
        { VALUE: false },
        { VALUE: undefined },
      ],
    };
    const operation: TitleCaseOperation = {
      id: "operation-5",
      type: "title_case",
      timestamp: Date.now(),
      payload: {
        column: "VALUE",
      },
    };

    const result = applyOperations(titleCaseDataset, [operation]);

    expect(result.rows).toEqual([
      { VALUE: "John Doe" },
      { VALUE: "Hello World" },
      { VALUE: "Mary Ann" },
      { VALUE: null },
      { VALUE: 42 },
      { VALUE: false },
      { VALUE: undefined },
    ]);
    expect(titleCaseDataset.rows[0].VALUE).toBe("john doe");
  });

  it("fills nullish and empty string values without changing non-empty values", () => {
    const fillDataset: Dataset = {
      ...dataset,
      columns: ["VALUE"],
      rows: [
        { VALUE: null },
        { VALUE: undefined },
        { VALUE: "" },
        { VALUE: "already present" },
        { VALUE: 42 },
        { VALUE: false },
      ],
    };
    const operation: FillMissingValuesOperation = {
      id: "operation-6",
      type: "fill_missing_values",
      timestamp: Date.now(),
      payload: {
        column: "VALUE",
        value: "Unknown",
      },
    };

    const result = applyOperations(fillDataset, [operation]);

    expect(result.rows).toEqual([
      { VALUE: "Unknown" },
      { VALUE: "Unknown" },
      { VALUE: "Unknown" },
      { VALUE: "already present" },
      { VALUE: 42 },
      { VALUE: false },
    ]);
    expect(fillDataset.rows[0].VALUE).toBeNull();
    expect(fillDataset.rows[3].VALUE).toBe("already present");
  });

  it("removes only rows where every value is empty", () => {
    const rowsDataset: Dataset = {
      ...dataset,
      columns: ["NAME", "AGE", "NOTE"],
      rows: [
        { NAME: null, AGE: undefined, NOTE: "" },
        { NAME: "Alice", AGE: undefined, NOTE: "" },
        { NAME: "", AGE: 0, NOTE: null },
        { NAME: "Bob", AGE: "30", NOTE: "Ready" },
      ],
    };
    const operation: RemoveEmptyRowsOperation = {
      id: "operation-7",
      type: "remove_empty_rows",
      timestamp: Date.now(),
      payload: {},
    };

    const result = applyOperations(rowsDataset, [operation]);

    expect(result.rows).toEqual([
      { NAME: "Alice", AGE: undefined, NOTE: "" },
      { NAME: "", AGE: 0, NOTE: null },
      { NAME: "Bob", AGE: "30", NOTE: "Ready" },
    ]);
    expect(rowsDataset.rows).toHaveLength(4);
  });

  it("concatenates columns with a separator and overwrites the destination", () => {
    const concatenateDataset: Dataset = {
      ...dataset,
      columns: ["FIRST", "LAST", "FULL_NAME"],
      rows: [
        { FIRST: "Ada", LAST: "Lovelace", FULL_NAME: "old value" },
        { FIRST: "Grace", LAST: null, FULL_NAME: "old value" },
        { FIRST: 42, LAST: " Hopper", FULL_NAME: "old value" },
      ],
    };
    const operation: ConcatenateColumnsOperation = {
      id: "operation-8",
      type: "concatenate_columns",
      timestamp: Date.now(),
      payload: {
        columns: ["FIRST", "LAST"],
        separator: " ",
        destination: "FULL_NAME",
      },
    };

    const result = applyOperations(concatenateDataset, [operation]);

    expect(result.columns).toEqual([
      "FIRST",
      "LAST",
      "FULL_NAME",
    ]);
    expect(result.rows).toEqual([
      {
        FIRST: "Ada",
        LAST: "Lovelace",
        FULL_NAME: "Ada Lovelace",
      },
      {
        FIRST: "Grace",
        LAST: null,
        FULL_NAME: "Grace ",
      },
      {
        FIRST: 42,
        LAST: " Hopper",
        FULL_NAME: "42  Hopper",
      },
    ]);
    expect(concatenateDataset.rows[0].FULL_NAME).toBe("old value");
  });

  it("adds a new destination column and supports custom separators", () => {
    const operation: ConcatenateColumnsOperation = {
      id: "operation-9",
      type: "concatenate_columns",
      timestamp: Date.now(),
      payload: {
        columns: ["NAME", "AGE"],
        separator: " | ",
        destination: "SUMMARY",
      },
    };

    const result = applyOperations(dataset, [operation]);

    expect(result.columns).toEqual([
      "NAME",
      "AGE",
      "SUMMARY",
    ]);
    expect(result.rows).toEqual([
      {
        NAME: "Alice",
        AGE: "24",
        SUMMARY: "Alice | 24",
      },
      {
        NAME: "Bob",
        AGE: "30",
        SUMMARY: "Bob | 30",
      },
    ]);
  });

  it("splits a column into ordered destinations and overwrites them", () => {
    const splitDataset: Dataset = {
      ...dataset,
      columns: ["FULL_NAME", "FIRST_NAME", "LAST_NAME"],
      rows: [
        {
          FULL_NAME: "John Smith",
          FIRST_NAME: "old",
          LAST_NAME: "old",
        },
        {
          FULL_NAME: "Ada Lovelace Byron",
          FIRST_NAME: "old",
          LAST_NAME: "old",
        },
        {
          FULL_NAME: "Grace",
          FIRST_NAME: "old",
          LAST_NAME: "old",
        },
      ],
    };
    const operation: SplitColumnOperation = {
      id: "operation-10",
      type: "split_column",
      timestamp: Date.now(),
      payload: {
        column: "FULL_NAME",
        separator: " ",
        destinations: ["FIRST_NAME", "LAST_NAME"],
      },
    };

    const result = applyOperations(splitDataset, [operation]);

    expect(result.columns).toEqual([
      "FULL_NAME",
      "FIRST_NAME",
      "LAST_NAME",
    ]);
    expect(result.rows).toEqual([
      {
        FULL_NAME: "John Smith",
        FIRST_NAME: "John",
        LAST_NAME: "Smith",
      },
      {
        FULL_NAME: "Ada Lovelace Byron",
        FIRST_NAME: "Ada",
        LAST_NAME: "Lovelace",
      },
      {
        FULL_NAME: "Grace",
        FIRST_NAME: "Grace",
        LAST_NAME: "",
      },
    ]);
    expect(splitDataset.rows[0].FIRST_NAME).toBe("old");
  });

  it("adds split destinations and supports custom separators", () => {
    const operation: SplitColumnOperation = {
      id: "operation-11",
      type: "split_column",
      timestamp: Date.now(),
      payload: {
        column: "NAME",
        separator: "l",
        destinations: ["PART_ONE", "PART_TWO", "PART_THREE"],
      },
    };

    const result = applyOperations(dataset, [operation]);

    expect(result.columns).toEqual([
      "NAME",
      "AGE",
      "PART_ONE",
      "PART_TWO",
      "PART_THREE",
    ]);
    expect(result.rows).toEqual([
      {
        NAME: "Alice",
        AGE: "24",
        PART_ONE: "A",
        PART_TWO: "ice",
        PART_THREE: "",
      },
      {
        NAME: "Bob",
        AGE: "30",
        PART_ONE: "Bob",
        PART_TWO: "",
        PART_THREE: "",
      },
    ]);
  });

  it("rounds numeric values and preserves non-numeric values", () => {
    const numbersDataset: Dataset = {
      ...dataset,
      columns: ["VALUE"],
      rows: [
        { VALUE: 12.3456 },
        { VALUE: -4.567 },
        { VALUE: 10 },
        { VALUE: "12.3456" },
        { VALUE: null },
        { VALUE: undefined },
        { VALUE: false },
      ],
    };
    const operation: RoundNumbersOperation = {
      id: "operation-12",
      type: "round_numbers",
      timestamp: Date.now(),
      payload: {
        column: "VALUE",
        decimals: 2,
      },
    };

    const result = applyOperations(numbersDataset, [operation]);

    expect(result.rows).toEqual([
      { VALUE: 12.35 },
      { VALUE: -4.57 },
      { VALUE: 10 },
      { VALUE: "12.3456" },
      { VALUE: null },
      { VALUE: undefined },
      { VALUE: false },
    ]);
    expect(numbersDataset.rows[0].VALUE).toBe(12.3456);
  });

  it("rounds to zero decimal places", () => {
    const operation: RoundNumbersOperation = {
      id: "operation-13",
      type: "round_numbers",
      timestamp: Date.now(),
      payload: {
        column: "AGE",
        decimals: 0,
      },
    };

    const result = applyOperations(
      {
        ...dataset,
        rows: [
          { NAME: "Alice", AGE: 24.6 },
          { NAME: "Bob", AGE: 30.4 },
        ],
      },
      [operation],
    );

    expect(result.rows).toEqual([
      { NAME: "Alice", AGE: 25 },
      { NAME: "Bob", AGE: 30 },
    ]);
  });
});
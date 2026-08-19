import { z } from "zod";

const RenameColumnSchema = z.object({
  type: z
    .literal("rename_column")
    .describe("Rename an existing column."),

  payload: z.object({
    from: z
      .string()
      .describe("Existing column name."),

    to: z
      .string()
      .describe("New column name."),
  }),

  explanation: z
    .string()
    .describe("Why this rename operation is required."),
});

const TrimWhitespaceSchema = z.object({
  type: z
    .literal("trim_whitespace")
    .describe(
      "Remove leading and trailing whitespace from every value in a column.",
    ),

  payload: z.object({
    column: z
      .string()
      .describe(
        "Column whose values should be trimmed.",
      ),
  }),

  explanation: z
    .string()
    .describe("Why trimming whitespace is required."),
});

const ReplaceTextSchema = z.object({
  type: z
    .literal("replace_text")
    .describe(
      "Replace every occurrence of text in string values in a column.",
    ),

  payload: z.object({
    column: z.string().describe("Column whose values should be updated."),
    find: z.string().describe("Text to find."),
    replace: z.string().describe("Replacement text."),
  }),

  explanation: z
    .string()
    .describe("Why replacing this text is required."),
});

const UppercaseSchema = z.object({
  type: z
    .literal("uppercase")
    .describe("Convert every string value in a column to uppercase."),

  payload: z.object({
    column: z
      .string()
      .describe("Column whose string values should be uppercased."),
  }),

  explanation: z
    .string()
    .describe("Why uppercasing this column is required."),
});

const LowercaseSchema = z.object({
  type: z
    .literal("lowercase")
    .describe("Convert every string value in a column to lowercase."),

  payload: z.object({
    column: z
      .string()
      .describe("Column whose string values should be lowercased."),
  }),

  explanation: z
    .string()
    .describe("Why lowercasing this column is required."),
});

const TitleCaseSchema = z.object({
  type: z
    .literal("title_case")
    .describe("Convert every word in a column to title case."),

  payload: z.object({
    column: z
      .string()
      .describe("Column whose string values should be title cased."),
  }),

  explanation: z
    .string()
    .describe("Why title casing this column is required."),
});

const FillMissingValuesSchema = z.object({
  type: z
    .literal("fill_missing_values")
    .describe(
      "Replace null, undefined, and empty string values in a column with a supplied value.",
    ),

  payload: z.object({
    column: z
      .string()
      .describe("Column whose missing values should be filled."),
    value: z
      .string()
      .describe("Value to use for missing entries."),
  }),

  explanation: z
    .string()
    .describe("Why filling missing values is required."),
});

const RemoveEmptyRowsSchema = z.object({
  type: z
    .literal("remove_empty_rows")
    .describe(
      "Remove rows where every value is null, undefined, or an empty string.",
    ),

  payload: z.object({}),

  explanation: z
    .string()
    .describe("Why removing empty rows is required."),
});

const ConcatenateColumnsSchema = z.object({
  type: z
    .literal("concatenate_columns")
    .describe(
      "Join selected columns into a new destination column using a custom separator.",
    ),

  payload: z.object({
    columns: z
      .array(z.string())
      .min(1)
      .describe("Columns to join, in order."),
    separator: z.string().describe("Text placed between joined values."),
    destination: z
      .string()
      .describe("Column to create or overwrite."),
  }),

  explanation: z
    .string()
    .describe("Why concatenating these columns is required."),
});

const SplitColumnSchema = z.object({
  type: z
    .literal("split_column")
    .describe(
      "Split a column into multiple destination columns using a separator.",
    ),

  payload: z.object({
    column: z.string().describe("Column to split."),
    separator: z.string().describe("Text separating the parts."),
    destinations: z
      .array(z.string())
      .min(1)
      .describe("Destination columns, in order."),
  }),

  explanation: z
    .string()
    .describe("Why splitting this column is required."),
});

const RoundNumbersSchema = z.object({
  type: z
    .literal("round_numbers")
    .describe(
      "Round numeric values in a column to a specified number of decimal places.",
    ),

  payload: z.object({
    column: z.string().describe("Column containing numeric values."),
    decimals: z
      .number()
      .int()
      .min(0)
      .describe("Number of decimal places to keep."),
  }),

  explanation: z
    .string()
    .describe("Why rounding this column is required."),
});

const DeleteColumnSchema = z.object({
  type: z
    .literal("delete_column")
    .describe("Delete an existing column."),

  payload: z.object({
    column: z
      .string()
      .describe("Column to delete."),
  }),

  explanation: z
    .string()
    .describe("Why deleting this column is required."),
});

export const PlannerSchema = z.object({
  confidence: z
    .enum([
      "high",
      "medium",
      "low",
    ])
    .describe(
      "Overall confidence in the generated plan.",
    ),

  steps: z.array(
    z.discriminatedUnion("type", [
      RenameColumnSchema,
      TrimWhitespaceSchema,
      ReplaceTextSchema,
      UppercaseSchema,
      LowercaseSchema,
      TitleCaseSchema,
      FillMissingValuesSchema,
      RemoveEmptyRowsSchema,
      ConcatenateColumnsSchema,
      SplitColumnSchema,
      RoundNumbersSchema,
      DeleteColumnSchema,
    ]),
  ),
});

export type PlannerOutput = z.infer<
  typeof PlannerSchema
>;
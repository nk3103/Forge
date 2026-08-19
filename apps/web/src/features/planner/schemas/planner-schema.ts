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
      DeleteColumnSchema,
    ]),
  ),
});

export type PlannerOutput = z.infer<
  typeof PlannerSchema
>;
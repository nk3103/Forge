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
    ]),
  ),
});

export type PlannerOutput = z.infer<
  typeof PlannerSchema
>;
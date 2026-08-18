import { z } from "zod";

export const PlannerSchema = z.object({
  confidence: z
    .enum(["high", "medium", "low"])
    .describe("Overall confidence in the generated plan."),

  steps: z.array(
    z.object({
      type: z
        .literal("rename_column")
        .describe("Spreadsheet operation type."),

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
        .describe("Why this operation is required."),
    }),
  ),
});

export type PlannerOutput =
  z.infer<typeof PlannerSchema>;
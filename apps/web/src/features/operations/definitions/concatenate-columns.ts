export const ConcatenateColumnsDefinition = {
  type: "concatenate_columns",

  description:
    "Join selected columns into a destination column using a custom separator.",

  parameters: {
    columns: "Columns to join, in order",
    separator: "Text placed between joined values",
    destination: "Column to create or overwrite",
  },
} as const;
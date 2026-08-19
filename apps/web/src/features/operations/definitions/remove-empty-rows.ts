export const RemoveEmptyRowsDefinition = {
  type: "remove_empty_rows",

  description:
    "Remove rows where every value is null, undefined, or an empty string.",

  parameters: {},
} as const;
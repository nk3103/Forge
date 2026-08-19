export const FillMissingValuesDefinition = {
  type: "fill_missing_values",

  description:
    "Replace null, undefined, and empty string values in a column with a supplied value.",

  parameters: {
    column: "Column whose missing values should be filled",
    value: "Value to use for missing entries",
  },
} as const;
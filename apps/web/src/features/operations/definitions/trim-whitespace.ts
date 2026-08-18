export const TrimWhitespaceDefinition = {
  type: "trim_whitespace",

  description:
    "Remove leading and trailing whitespace from every value in a column.",

  parameters: {
    column: "Column whose values should be trimmed.",
  },
} as const;
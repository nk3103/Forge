export const LowercaseDefinition = {
  type: "lowercase",

  description:
    "Convert every string value in a column to lowercase.",

  parameters: {
    column: "Column whose string values should be lowercased",
  },
} as const;
export const UppercaseDefinition = {
  type: "uppercase",

  description:
    "Convert every string value in a column to uppercase.",

  parameters: {
    column: "Column whose string values should be uppercased",
  },
} as const;
export const TitleCaseDefinition = {
  type: "title_case",

  description:
    "Convert every word in a column to title case.",

  parameters: {
    column: "Column whose string values should be title cased",
  },
} as const;
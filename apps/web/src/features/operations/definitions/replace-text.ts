export const ReplaceTextDefinition = {
  type: "replace_text",

  description:
    "Replace every occurrence of text in string values in a column.",

  parameters: {
    column: "Column whose string values should be updated",
    find: "Text to find",
    replace: "Replacement text",
  },
} as const;
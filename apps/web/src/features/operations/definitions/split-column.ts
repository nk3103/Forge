export const SplitColumnDefinition = {
  type: "split_column",

  description:
    "Split a column into multiple destination columns using a separator.",

  parameters: {
    column: "Column to split",
    separator: "Text separating the parts",
    destinations: "Destination columns, in order",
  },
} as const;
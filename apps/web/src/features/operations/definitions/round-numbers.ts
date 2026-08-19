export const RoundNumbersDefinition = {
  type: "round_numbers",

  description:
    "Round numeric values in a column to a specified number of decimal places.",

  parameters: {
    column: "Column containing numeric values",
    decimals: "Number of decimal places to keep",
  },
} as const;
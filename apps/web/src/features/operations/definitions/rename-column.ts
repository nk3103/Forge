export const RenameColumnDefinition = {
  type: "rename_column",

  description:
    "Rename an existing column.",

  parameters: {
    from: "Existing column name",
    to: "New column name",
  },
} as const;
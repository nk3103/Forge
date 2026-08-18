export const RenameColumnPlannerOperation = {
  type: "rename_column",

  description:
    "Rename an existing column to a new name.",

  parameters: {
    from: "Existing column name",
    to: "New column name",
  },
} as const;
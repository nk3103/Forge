export const DeleteColumnDefinition = {
  type: "delete_column",

  description: "Delete an existing column.",

  parameters: {
    column: "Column to delete",
  },
} as const;
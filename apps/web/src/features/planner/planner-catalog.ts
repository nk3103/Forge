import { RenameColumnDefinition } from "@/features/operations/definitions/rename-column";
import { TrimWhitespaceDefinition } from "@/features/operations/definitions/trim-whitespace";
import { ReplaceTextDefinition } from "@/features/operations/definitions/replace-text";
import { UppercaseDefinition } from "@/features/operations/definitions/uppercase";
import { DeleteColumnDefinition } from "@/features/operations/definitions/delete-column";

export const plannerCatalog = [
  RenameColumnDefinition,
  TrimWhitespaceDefinition,
  ReplaceTextDefinition,
  UppercaseDefinition,
  DeleteColumnDefinition,
];

export type PlannerOperationDefinition =
  (typeof plannerCatalog)[number];
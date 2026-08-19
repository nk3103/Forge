import { RenameColumnDefinition } from "@/features/operations/definitions/rename-column";
import { TrimWhitespaceDefinition } from "@/features/operations/definitions/trim-whitespace";
import { ReplaceTextDefinition } from "@/features/operations/definitions/replace-text";
import { UppercaseDefinition } from "@/features/operations/definitions/uppercase";
import { LowercaseDefinition } from "@/features/operations/definitions/lowercase";
import { TitleCaseDefinition } from "@/features/operations/definitions/title-case";
import { FillMissingValuesDefinition } from "@/features/operations/definitions/fill-missing-values";
import { RemoveEmptyRowsDefinition } from "@/features/operations/definitions/remove-empty-rows";
import { ConcatenateColumnsDefinition } from "@/features/operations/definitions/concatenate-columns";
import { SplitColumnDefinition } from "@/features/operations/definitions/split-column";
import { RoundNumbersDefinition } from "@/features/operations/definitions/round-numbers";
import { DeleteColumnDefinition } from "@/features/operations/definitions/delete-column";

export const plannerCatalog = [
  RenameColumnDefinition,
  TrimWhitespaceDefinition,
  ReplaceTextDefinition,
  UppercaseDefinition,
  LowercaseDefinition,
  TitleCaseDefinition,
  FillMissingValuesDefinition,
  RemoveEmptyRowsDefinition,
  ConcatenateColumnsDefinition,
  SplitColumnDefinition,
  RoundNumbersDefinition,
  DeleteColumnDefinition,
];

export type PlannerOperationDefinition =
  (typeof plannerCatalog)[number];
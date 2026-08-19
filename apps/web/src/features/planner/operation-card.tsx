"use client";

import type { Operation } from "@/features/operations/operation-types";

import { RenameOperationCard } from "./operation-cards/rename-operation-card";
import { TrimWhitespaceOperationCard } from "./operation-cards/trim-whitespace-operation-card";
import { ReplaceTextOperationCard } from "./operation-cards/replace-text-operation-card";
import { UppercaseOperationCard } from "./operation-cards/uppercase-operation-card";
import { LowercaseOperationCard } from "./operation-cards/lowercase-operation-card";
import { TitleCaseOperationCard } from "./operation-cards/title-case-operation-card";
import { FillMissingValuesOperationCard } from "./operation-cards/fill-missing-values-operation-card";
import { RemoveEmptyRowsOperationCard } from "./operation-cards/remove-empty-rows-operation-card";
import { ConcatenateColumnsOperationCard } from "./operation-cards/concatenate-columns-operation-card";
import { SplitColumnOperationCard } from "./operation-cards/split-column-operation-card";
import { RoundNumbersOperationCard } from "./operation-cards/round-numbers-operation-card";
import { DeleteColumnOperationCard } from "./operation-cards/delete-column-operation-card";

interface OperationCardProps {
  operation: Operation;
  explanation: string;
}

export function OperationCard({
  operation,
  explanation,
}: OperationCardProps) {
  switch (operation.type) {
    case "rename_column":
      return (
        <RenameOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "trim_whitespace":
      return (
        <TrimWhitespaceOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "replace_text":
      return (
        <ReplaceTextOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "uppercase":
      return (
        <UppercaseOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "lowercase":
      return (
        <LowercaseOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "title_case":
      return (
        <TitleCaseOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "fill_missing_values":
      return (
        <FillMissingValuesOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "remove_empty_rows":
      return (
        <RemoveEmptyRowsOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "concatenate_columns":
      return (
        <ConcatenateColumnsOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "split_column":
      return (
        <SplitColumnOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "round_numbers":
      return (
        <RoundNumbersOperationCard
          operation={operation}
          explanation={explanation}
        />
      );

    case "delete_column":
      return (
        <DeleteColumnOperationCard
          operation={operation}
          explanation={explanation}
        />
      );
  }
}
"use client";

import type { Operation } from "@/features/operations/operation-types";

import { RenameOperationCard } from "./operation-cards/rename-operation-card";
import { TrimWhitespaceOperationCard } from "./operation-cards/trim-whitespace-operation-card";

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
  }
}
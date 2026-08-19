"use client";

import { describeOperation } from "@/features/operations/describe-operation";
import type { RemoveEmptyRowsOperation } from "@/features/operations/operation-types";

interface RemoveEmptyRowsOperationCardProps {
  operation: RemoveEmptyRowsOperation;
  explanation: string;
}

export function RemoveEmptyRowsOperationCard({
  operation,
  explanation,
}: RemoveEmptyRowsOperationCardProps) {
  const description = describeOperation(operation);

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="font-medium">{description.title}</div>
      <div className="text-sm text-muted-foreground">
        {description.description}
      </div>
      <div className="mt-2 text-sm">{explanation}</div>
    </div>
  );
}
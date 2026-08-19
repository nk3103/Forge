"use client";

import { describeOperation } from "@/features/operations/describe-operation";
import type { SplitColumnOperation } from "@/features/operations/operation-types";

interface SplitColumnOperationCardProps {
  operation: SplitColumnOperation;
  explanation: string;
}

export function SplitColumnOperationCard({
  operation,
  explanation,
}: SplitColumnOperationCardProps) {
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
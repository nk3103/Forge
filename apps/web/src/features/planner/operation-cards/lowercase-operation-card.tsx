"use client";

import { describeOperation } from "@/features/operations/describe-operation";
import type { LowercaseOperation } from "@/features/operations/operation-types";

interface LowercaseOperationCardProps {
  operation: LowercaseOperation;
  explanation: string;
}

export function LowercaseOperationCard({
  operation,
  explanation,
}: LowercaseOperationCardProps) {
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
"use client";

import { formatDistanceToNow } from "date-fns";

import { describeOperation } from "./describe-operation";
import type { Operation } from "./operation-types";

interface WorkflowTimelineProps {
  operations: Operation[];
}

export function WorkflowTimeline({
  operations,
}: WorkflowTimelineProps) {
  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold">
          Workflow
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          This is how Forge has learned your process.
        </p>
      </div>

      {operations.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Teach Forge your first transformation.
            Every step becomes part of a reusable workflow.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {operations.map((operation) => {
            const description =
              describeOperation(operation);

            return (
              <div
                key={operation.id}
                className="flex gap-4"
              >
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>

                <div className="flex-1">
                  <p className="font-medium">
                    {description.title}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {description.description}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDistanceToNow(
                      operation.timestamp,
                      {
                        addSuffix: true,
                      },
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
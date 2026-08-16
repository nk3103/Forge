import type { Operation } from "./operation-types";

export interface OperationDescription {
  title: string;
  description: string;
}

export function describeOperation(
  operation: Operation,
): OperationDescription {
  switch (operation.type) {
    case "rename_column":
      return {
        title: "Renamed column",
        description: `${operation.payload.from} → ${operation.payload.to}`,
      };
  }
}
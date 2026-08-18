import type { Operation } from "./operation-types";

export interface OperationDescription {
  title: string;
  description: string;
}

function assertNever(value: never): never {
  throw new Error(
    `Unhandled operation: ${JSON.stringify(value)}`,
  );
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

    case "trim_whitespace":
      return {
        title: "Trimmed whitespace",
        description: `Removed leading and trailing whitespace from "${operation.payload.column}"`,
      };

    default:
      return assertNever(operation);
  }
}
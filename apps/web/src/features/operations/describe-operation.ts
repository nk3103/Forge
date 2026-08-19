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

    case "replace_text":
      return {
        title: "Replaced text",
        description: `Replaced "${operation.payload.find}" with "${operation.payload.replace}" in "${operation.payload.column}"`,
      };

    case "uppercase":
      return {
        title: "Uppercased values",
        description: `Converted string values in "${operation.payload.column}" to uppercase`,
      };

      case "delete_column":
        return {
          title: "Deleted column",
          description:
            operation.payload.column,
        };

    default:
      return assertNever(operation);
  }
}
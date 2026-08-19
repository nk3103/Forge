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

    case "lowercase":
      return {
        title: "Lowercased values",
        description: `Converted string values in "${operation.payload.column}" to lowercase`,
      };

    case "title_case":
      return {
        title: "Title cased values",
        description: `Converted string values in "${operation.payload.column}" to title case`,
      };

    case "fill_missing_values":
      return {
        title: "Filled missing values",
        description: `Filled missing values in "${operation.payload.column}" with "${operation.payload.value}"`,
      };

    case "remove_empty_rows":
      return {
        title: "Removed empty rows",
        description:
          "Removed rows containing only null, undefined, or empty string values",
      };

    case "concatenate_columns":
      return {
        title: "Concatenated columns",
        description: `Joined ${operation.payload.columns.join(", ")} into "${operation.payload.destination}"`,
      };

    case "split_column":
      return {
        title: "Split column",
        description: `Split "${operation.payload.column}" into ${operation.payload.destinations.join(", ")}`,
      };

    case "round_numbers":
      return {
        title: "Rounded numbers",
        description: `Rounded numeric values in "${operation.payload.column}" to ${operation.payload.decimals} decimal places`,
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
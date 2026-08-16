import type { Operation } from "./operation-types";

export function describeOperation(
  operation: Operation,
): string {
  switch (operation.type) {
    case "rename_column":
      return `Renamed column "${operation.payload.from}" → "${operation.payload.to}"`;
  }
}
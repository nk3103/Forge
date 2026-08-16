import type { Dataset } from "@/features/dataset/types";

import type { Operation } from "./operation-types";
import { applyRenameColumn } from "./executors/rename-column";

function assertNever(value: never): never {
  throw new Error(
    `Unhandled operation: ${JSON.stringify(value)}`,
  );
}

export function applyOperations(
    originalDataset: Dataset,
    operations: Operation[],
): Dataset {
    return operations.reduce((dataset, operation) => {
        switch (operation.type) {
            case "rename_column":
                return applyRenameColumn(dataset, operation);
        }
    }, originalDataset);
}
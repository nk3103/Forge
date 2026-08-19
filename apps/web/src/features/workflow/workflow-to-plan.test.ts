import { describe, expect, it } from "vitest";

import type { RenameColumnOperation } from "@/features/operations/operation-types";

import { workflowToGeneratedPlan } from "./workflow-to-plan";
import type { Workflow } from "./types";

describe("workflowToGeneratedPlan", () => {
  it("adapts saved operations to the existing plan shape", () => {
    const operation: RenameColumnOperation = {
      id: "operation-1",
      type: "rename_column",
      timestamp: 100,
      payload: {
        from: "NAME",
        to: "FULL_NAME",
      },
    };
    const workflow: Workflow = {
      metadata: {
        id: "workflow-1",
        name: "Normalize names",
      },
      operations: [operation],
      createdAt: 100,
      updatedAt: 100,
      sourcePrompt: "Rename NAME",
      datasetSignature: {
        columns: ["name"],
        columnCount: 1,
        columnTypes: { name: "string" },
      },
      usageCount: 0,
      version: 1,
    };

    expect(workflowToGeneratedPlan(workflow)).toEqual({
      confidence: "high",
      steps: [
        {
          operation,
          explanation: "Saved workflow operation",
        },
      ],
    });
  });
});
import { describe, expect, it } from "vitest";

import type { RenameColumnOperation } from "@/features/operations/operation-types";

import { createWorkflow } from "./create-workflow";

describe("createWorkflow", () => {
  it("creates a workflow with stable supplied metadata", () => {
    const operation: RenameColumnOperation = {
      id: "operation-1",
      type: "rename_column",
      timestamp: 100,
      payload: {
        from: "NAME",
        to: "FULL_NAME",
      },
    };

    const workflow = createWorkflow({
      id: "workflow-1",
      name: "Normalize employee names",
      description: "Reusable employee cleanup workflow.",
      operations: [operation],
      sourcePrompt: "Rename NAME to FULL_NAME",
      datasetSignature: "age|name",
      createdAt: 200,
    });

    expect(workflow).toEqual({
      metadata: {
        id: "workflow-1",
        name: "Normalize employee names",
        description: "Reusable employee cleanup workflow.",
      },
      operations: [operation],
      createdAt: 200,
      updatedAt: 200,
      sourcePrompt: "Rename NAME to FULL_NAME",
      datasetSignature: "age|name",
      usageCount: 0,
      version: 1,
    });
  });

  it("provides id and creation defaults when omitted", () => {
    const workflow = createWorkflow({
      name: "Empty workflow",
      operations: [],
      sourcePrompt: "",
      datasetSignature: "",
    });

    expect(workflow.metadata.id).toEqual(expect.any(String));
    expect(workflow.createdAt).toEqual(expect.any(Number));
    expect(workflow.updatedAt).toBe(workflow.createdAt);
    expect(workflow.usageCount).toBe(0);
    expect(workflow.version).toBe(1);
    expect(workflow.metadata).not.toHaveProperty("description");
  });
});

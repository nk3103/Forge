import { describe, expect, it } from "vitest";

import type { Dataset } from "@/features/dataset/types";
import type { Workflow } from "@/features/workflow/types";
import { findBestWorkflowMatch, scoreWorkflow } from "./workflow-matcher";

const dataset: Dataset = {
  id: "dataset-1",
  name: "people.csv",
  columns: ["Name", "Age"],
  rows: [
    { Name: "Ada", Age: 36 },
    { Name: "Grace", Age: 28 },
  ],
};

function workflow(id: string, columns: string[]): Workflow {
  return {
    metadata: { id, name: id },
    operations: [],
    createdAt: 1,
    updatedAt: 1,
    sourcePrompt: "",
    datasetSignature: {
      originalColumns: columns,
      normalizedColumns: columns,
      columnCount: columns.length,
      columnTypes: {
        name: "string",
        age: "number",
      },
    },
    usageCount: 0,
    version: 1,
  };
}

describe("workflow matcher", () => {
  it("weights exact column and type matches at 100%", () => {
    expect(
      scoreWorkflow(
        {
          originalColumns: ["AGE", "NAME"],
          normalizedColumns: ["age", "name"],
          columnCount: 2,
          columnTypes: { age: "number", name: "string" },
        },
        workflow("exact", ["age", "name"]).datasetSignature,
      ),
    ).toBe(1);
  });

  it("returns the best match only above the threshold", () => {
    expect(
      findBestWorkflowMatch(dataset, [workflow("best", ["age", "name"])]),
    ).toMatchObject({ workflow: { metadata: { id: "best" } }, score: 1 });
    expect(
      findBestWorkflowMatch(dataset, [workflow("weak", ["email"])]),
    ).toBeNull();
  });
});
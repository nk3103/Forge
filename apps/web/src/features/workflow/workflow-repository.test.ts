import { beforeEach, describe, expect, it } from "vitest";

import type { Workflow } from "./types";
import {
  loadWorkflow,
  loadWorkflows,
  removeWorkflow,
  saveWorkflow,
} from "./workflow-repository";

function createStorageMock(): Storage {
  const values = new Map<string, string>();

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
    clear: () => values.clear(),
    key: (index) => Array.from(values.keys())[index] ?? null,
    get length() {
      return values.size;
    },
  };
}

const workflow: Workflow = {
  metadata: {
    id: "workflow-1",
    name: "Normalize names",
    description: "Reusable cleanup.",
  },
  operations: [],
  createdAt: 100,
  updatedAt: 100,
  sourcePrompt: "Normalize names",
  datasetSignature: "name",
  usageCount: 0,
  version: 1,
};

beforeEach(() => {
  const localStorage = createStorageMock();

  globalThis.window = {
    localStorage,
  } as unknown as Window & typeof globalThis;
});

describe("workflow repository", () => {
  it("saves and loads workflows from localStorage", () => {
    saveWorkflow(workflow);

    expect(loadWorkflows()).toEqual([workflow]);
    expect(loadWorkflow("workflow-1")).toEqual(workflow);
  });

  it("replaces a workflow with the same id", () => {
    saveWorkflow(workflow);
    saveWorkflow({
      ...workflow,
      updatedAt: 200,
      version: 2,
    });

    expect(loadWorkflows()).toEqual([
      {
        ...workflow,
        updatedAt: 200,
        version: 2,
      },
    ]);
  });

  it("removes a workflow", () => {
    saveWorkflow(workflow);
    removeWorkflow("workflow-1");

    expect(loadWorkflows()).toEqual([]);
    expect(loadWorkflow("workflow-1")).toBeNull();
  });
});
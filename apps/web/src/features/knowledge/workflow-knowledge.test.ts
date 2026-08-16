import { beforeEach, describe, expect, it } from "vitest";

import {
  clearKnowledge,
  findWorkflow,
  rememberWorkflow,
} from "./workflow-knowledge";

describe("Workflow Knowledge", () => {
  beforeEach(() => {
    clearKnowledge();
  });

  it("stores workflows", () => {
    rememberWorkflow({
      id: "1",
      datasetSignature: "age|name",
      operations: [],
    });

    expect(
      findWorkflow("age|name"),
    ).toBeDefined();
  });

  it("returns undefined for unknown signatures", () => {
    expect(
      findWorkflow("salary|email"),
    ).toBeUndefined();
  });
});
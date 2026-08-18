import { describe, expect, it } from "vitest";

import { MockPlanner } from "../mock-planner";

describe("MockPlanner", () => {
  const planner = new MockPlanner();

  it("returns a plan for a supported prompt", async () => {
    const plan = await planner.generatePlan(
      {
        id: "1",
        name: "employees.csv",
        columns: ["NAME", "AGE"],
        rows: [],
      },
      "Rename NAME to Full Name",
    );

    expect(plan.steps).toHaveLength(1);
    expect(plan.confidence).toBe("high");
  });

  it("returns no plan for an unsupported prompt", async () => {
    const plan = await planner.generatePlan(
      {
        id: "1",
        name: "employees.csv",
        columns: ["NAME", "AGE"],
        rows: [],
      },
      "Sort by age",
    );

    expect(plan.steps).toHaveLength(0);
    expect(plan.confidence).toBe("low");
  });

  it("returns no plan when the dataset does not contain the required column", async () => {
    const plan = await planner.generatePlan(
      {
        id: "1",
        name: "employees.csv",
        columns: ["FIRST_NAME"],
        rows: [],
      },
      "Rename NAME to Full Name",
    );

    expect(plan.steps).toHaveLength(0);
  });
});
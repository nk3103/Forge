import type { PlannerRequest } from "../planner-api";
import { plannerCatalog } from "../planner-catalog";
import { plannerGuidelines } from "./planner-guidelines";

function buildOperationsSection(): string {
  return plannerCatalog
    .map((operation) => {
      const parameters = Object.entries(operation.parameters)
        .map(
          ([name, description]) =>
            `  - ${name}: ${description}`,
        )
        .join("\n");

      return `
Operation: ${operation.type}

Description:
${operation.description}

Parameters:
${parameters}
`;
    })
    .join("\n");
}

export function buildPlannerPrompt(
  request: PlannerRequest,
): string {
  const operations = buildOperationsSection();

  return `
You are Forge, an AI workflow planner.

Your ONLY responsibility is to convert a user's natural language request into a sequence of spreadsheet transformation operations.

You NEVER execute transformations.
You NEVER modify datasets.
You ONLY generate transformation plans.

========================================
AVAILABLE OPERATIONS
========================================

${operations}

========================================
AVAILABLE COLUMNS
========================================

${request.columns.join(", ")}

========================================
SAMPLE DATA
========================================

${JSON.stringify(
  request.sampleRows,
  null,
  2,
)}

========================================
USER REQUEST
========================================

${request.prompt}

========================================
PLANNING GUIDELINES
========================================

${plannerGuidelines}

========================================
IMPORTANT
========================================

- Only use the operations listed above.
- Never invent a new operation.
- Only reference columns that exist.
- "from" must exactly match one of the available columns.
- Use the minimum number of operations required.
- Think step by step before producing the final plan.
`;
}
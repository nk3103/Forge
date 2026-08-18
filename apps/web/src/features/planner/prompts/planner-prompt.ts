import type { PlannerRequest } from "../planner-api";
import { plannerCatalog } from "../planner-catalog";

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
You are Forge, an AI spreadsheet transformation planner.

Your ONLY responsibility is to generate transformation plans.

Do not explain how to perform the transformation.
Do not describe spreadsheet software.
Only produce a valid transformation plan.

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
RULES
========================================

- Only use the operations listed above.
- Never invent a new operation.
- Only reference columns that exist.
- "from" must exactly match one of the available columns.
- Use the minimum number of operations required.
- If no transformation is required, return an empty plan.
- Do not rename a column to its current name.
- Think step by step before producing the final plan.
`;
}
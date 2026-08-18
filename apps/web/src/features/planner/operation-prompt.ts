import type { PlannerOperationDefinition } from "./planner-catalog";

export function buildOperationPrompt(
  operation: PlannerOperationDefinition,
): string {
  const parameters =
    Object.entries(operation.parameters)
      .map(
        ([name, description]) =>
          `- ${name}: ${description}`,
      )
      .join("\n");

  return `
Operation

${operation.type}

Description

${operation.description}

Parameters

${parameters}
`;
}
import type { DatasetSignature, Workflow } from "./types";

const WORKFLOWS_STORAGE_KEY = "forge.workflows";
const WORKFLOWS_CHANGED_EVENT = "forge:workflows-changed";

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function normalizeWorkflow(
  workflow: Workflow & { datasetSignature: DatasetSignature | string },
): Workflow {
  if (typeof workflow.datasetSignature !== "string") {
    return workflow;
  }

  const columns = workflow.datasetSignature
    ? workflow.datasetSignature.split("|")
    : [];

  return {
    ...workflow,
    datasetSignature: {
      columns,
      columnCount: columns.length,
      columnTypes: Object.fromEntries(
        columns.map((column) => [column, "unknown"]),
      ),
    },
  };
}

function notifyWorkflowChange(): void {
  if (
    typeof window !== "undefined" &&
    typeof window.dispatchEvent === "function"
  ) {
    window.dispatchEvent(
      new Event(WORKFLOWS_CHANGED_EVENT),
    );
  }
}

export function subscribeWorkflowChanges(
  listener: () => void,
): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  if (typeof window.addEventListener !== "function") {
    return () => undefined;
  }

  window.addEventListener(
    WORKFLOWS_CHANGED_EVENT,
    listener,
  );

  return () => {
    if (typeof window.removeEventListener !== "function") {
      return;
    }

    window.removeEventListener(
      WORKFLOWS_CHANGED_EVENT,
      listener,
    );
  };
}

export function loadWorkflows(): Workflow[] {
  const storage = getStorage();

  if (!storage) return [];

  const serialized = storage.getItem(
    WORKFLOWS_STORAGE_KEY,
  );

  if (!serialized) return [];

  try {
    const parsed: unknown = JSON.parse(serialized);

    return Array.isArray(parsed)
      ? (parsed as Array<Workflow & { datasetSignature: DatasetSignature | string }>).map(
          normalizeWorkflow,
        )
      : [];
  } catch {
    return [];
  }
}

export function saveWorkflow(
  workflow: Workflow,
): void {
  const storage = getStorage();

  if (!storage) return;

  const workflows = loadWorkflows();
  const existingIndex = workflows.findIndex(
    (current) =>
      current.metadata.id === workflow.metadata.id,
  );

  if (existingIndex === -1) {
    workflows.push(workflow);
  } else {
    workflows[existingIndex] = workflow;
  }

  storage.setItem(
    WORKFLOWS_STORAGE_KEY,
    JSON.stringify(workflows),
  );

  notifyWorkflowChange();
}

export function loadWorkflow(
  workflowId: string,
): Workflow | null {
  return (
    loadWorkflows().find(
      (workflow) =>
        workflow.metadata.id === workflowId,
    ) ?? null
  );
}

export function recordWorkflowUsage(
  workflowId: string,
): Workflow | null {
  const workflow = loadWorkflow(workflowId);

  if (!workflow) return null;

  const updatedWorkflow: Workflow = {
    ...workflow,
    updatedAt: Date.now(),
    usageCount: workflow.usageCount + 1,
  };

  saveWorkflow(updatedWorkflow);

  return updatedWorkflow;
}

export function removeWorkflow(
  workflowId: string,
): void {
  const storage = getStorage();

  if (!storage) return;

  const workflows = loadWorkflows().filter(
    (workflow) =>
      workflow.metadata.id !== workflowId,
  );

  storage.setItem(
    WORKFLOWS_STORAGE_KEY,
    JSON.stringify(workflows),
  );

  notifyWorkflowChange();
}
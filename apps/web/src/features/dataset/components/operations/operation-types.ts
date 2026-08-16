export type OperationType = "rename_column";

export interface Operation {
  id: string;

  type: OperationType;

  timestamp: number;

  payload: RenameColumnPayload;
}

export interface RenameColumnPayload {
  from: string;
  to: string;
}
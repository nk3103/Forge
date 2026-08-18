export type OperationType = "rename_column";

export interface BaseOperation {
  id: string;
  type: OperationType;
  timestamp: number;
}

export interface RenameColumnOperation extends BaseOperation {
  type: "rename_column";

  payload: {
    from: string;
    to: string;
  };
}

export interface TrimWhitespaceOperation {
  id: string;
  type: "trim_whitespace";
  timestamp: number;

  payload: {
    column: string;
  };
}

export type Operation =
  | RenameColumnOperation
  | TrimWhitespaceOperation;
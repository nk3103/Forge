export type OperationType =
  | "rename_column"
  | "trim_whitespace"
  | "replace_text"
  | "uppercase"
  | "delete_column";

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

export interface ReplaceTextOperation extends BaseOperation {
  type: "replace_text";

  payload: {
    column: string;
    find: string;
    replace: string;
  };
}

export interface UppercaseOperation extends BaseOperation {
  type: "uppercase";

  payload: {
    column: string;
  };
}

export interface DeleteColumnOperation extends BaseOperation {
  id: string;
  type: "delete_column";

  payload: {
    column: string;
  };
}

export type Operation =
  | RenameColumnOperation
  | TrimWhitespaceOperation
  | ReplaceTextOperation
  | UppercaseOperation
  | DeleteColumnOperation;
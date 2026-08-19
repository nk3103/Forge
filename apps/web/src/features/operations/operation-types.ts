export type OperationType =
  | "rename_column"
  | "trim_whitespace"
  | "replace_text"
  | "uppercase"
  | "lowercase"
  | "title_case"
  | "fill_missing_values"
  | "remove_empty_rows"
  | "concatenate_columns"
  | "split_column"
  | "round_numbers"
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

export interface LowercaseOperation extends BaseOperation {
  type: "lowercase";

  payload: {
    column: string;
  };
}

export interface TitleCaseOperation extends BaseOperation {
  type: "title_case";

  payload: {
    column: string;
  };
}

export interface FillMissingValuesOperation extends BaseOperation {
  type: "fill_missing_values";

  payload: {
    column: string;
    value: string;
  };
}

export interface RemoveEmptyRowsOperation extends BaseOperation {
  type: "remove_empty_rows";
  payload: Record<string, never>;
}

export interface ConcatenateColumnsOperation extends BaseOperation {
  type: "concatenate_columns";

  payload: {
    columns: string[];
    separator: string;
    destination: string;
  };
}

export interface SplitColumnOperation extends BaseOperation {
  type: "split_column";

  payload: {
    column: string;
    separator: string;
    destinations: string[];
  };
}

export interface RoundNumbersOperation extends BaseOperation {
  type: "round_numbers";

  payload: {
    column: string;
    decimals: number;
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
  | LowercaseOperation
  | TitleCaseOperation
  | FillMissingValuesOperation
  | RemoveEmptyRowsOperation
  | ConcatenateColumnsOperation
  | SplitColumnOperation
  | RoundNumbersOperation
  | DeleteColumnOperation;
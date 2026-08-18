export type DatasetRow = Record<string, unknown>;

export interface Dataset {
  id: string;
  name: string;
  columns: string[];
  rows: DatasetRow[];
}
export interface Dataset {
  id: string;
  name: string;
  columns: string[];
  rows: Record<string, unknown>[];
}
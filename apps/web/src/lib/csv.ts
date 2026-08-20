import Papa from "papaparse";

export function parseCsv(file: File) {
  return new Promise<Papa.ParseResult<Record<string, unknown>>>(
    (resolve, reject) => {
      Papa.parse<Record<string, unknown>>(file, {
        header: true,
        skipEmptyLines: true,
        complete: resolve,
        error: reject,
      });
    },
  );
}
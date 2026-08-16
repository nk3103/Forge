"use client";

import Papa from "papaparse";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Dataset } from "../types";

interface DatasetUploadProps {
  onDatasetLoaded: (dataset: Dataset) => void;
  compact?: boolean;
}

export function DatasetUpload({
  onDatasetLoaded,
  compact = false,
}: DatasetUploadProps) {
  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file.");
      return;
    }

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const dataset: Dataset = {
          id: crypto.randomUUID(),
          name: file.name,
          columns: results.meta.fields ?? [],
          rows: results.data,
        };

        onDatasetLoaded(dataset);

        // Allows re-uploading the same file.
        event.target.value = "";
      },
    });
  }

  return (
    <>
      <input
        id={compact ? "dataset-upload-compact" : "dataset-upload"}
        hidden
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />

      <Button
        variant={compact ? "outline" : "default"}
        size={compact ? "default" : "lg"}
        onClick={() =>
          document
            .getElementById(
              compact
                ? "dataset-upload-compact"
                : "dataset-upload",
            )
            ?.click()
        }
      >
        <Upload className="mr-2 h-4 w-4" />

        {compact
          ? "Upload New Dataset"
          : "Teach Forge with a Dataset"}
      </Button>
    </>
  );
}
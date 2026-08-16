"use client";

import { useRef } from "react";
import Papa from "papaparse";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Dataset } from "../types";

interface DatasetUploadProps {
  onDatasetLoaded: (dataset: Dataset) => void;
}

export function DatasetUpload({
  onDatasetLoaded,
}: DatasetUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
      },
    });
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        hidden
        onChange={handleFileUpload}
      />

      <Button
        size="lg"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mr-2 h-4 w-4" />
        Teach Forge with a Dataset
      </Button>
    </>
  );
}
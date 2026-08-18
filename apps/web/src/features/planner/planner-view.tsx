"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

interface PlannerViewProps {
  loading: boolean;
  onGenerate: (prompt: string) => void;
}

export function PlannerView({
  loading,
  onGenerate,
}: PlannerViewProps) {
  const [prompt, setPrompt] =
    useState("");

  function handleSubmit() {
    const trimmed = prompt.trim();

    if (!trimmed) return;

    onGenerate(trimmed);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Describe what you'd like Forge to do
        </label>

        <textarea
          rows={4}
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Rename NAME to Full Name"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={
          loading || !prompt.trim()
        }
      >
        {loading
          ? "Generating..."
          : "Generate Plan"}
      </Button>
    </div>
  );
}
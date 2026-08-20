const loadingStages = [
  "Analyzing dataset...",
  "Choosing transformations...",
  "Validating execution...",
];

export function PlannerLoading() {
  return (
    <section
      aria-live="polite"
      aria-label="Generating transformation plan"
      className="mt-6 rounded-xl border bg-muted/30 p-5"
    >
      <p className="text-sm font-medium text-muted-foreground">
        Generating transformation plan
      </p>

      <div className="mt-5 space-y-4">
        {loadingStages.map((stage) => (
          <div
            key={stage}
            className="rounded-lg border bg-background p-4"
          >
            <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            <p className="mt-3 text-sm text-muted-foreground">
              {stage}
            </p>
            <div className="mt-3 h-3 w-full animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}

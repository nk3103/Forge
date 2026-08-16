import { DatasetWorkspace } from "@/features/dataset/components/dataset-workspace";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-8 py-20">
        <div className="space-y-12">
          <section className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              Forge
            </h1>

            <div className="max-w-3xl space-y-4">
              <h2 className="text-6xl font-semibold tracking-tight leading-tight">
                Teach once.
                <br />
                Automate repeatedly.
              </h2>

              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Forge learns how you transform spreadsheets by watching your
                decisions. The next time you upload similar data, it prepares an
                execution plan, explains every step, and lets you stay in
                control.
              </p>
            </div>
          </section>

          <DatasetWorkspace />
        </div>
      </div>
    </main>
  );
}
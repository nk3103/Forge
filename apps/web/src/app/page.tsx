import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <Card className="w-full max-w-2xl border-border/60 shadow-sm">
          <CardContent className="space-y-8 p-10">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Forge
              </span>

              <div className="space-y-3">
                <h1 className="text-5xl font-semibold tracking-tight">
                  Your AI teammate for repetitive data work.
                </h1>

                <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                  Teach me how you clean one dataset, and I'll help with the
                  next.
                </p>
              </div>
            </div>

            <Button size="lg" className="gap-2">
              Upload Dataset
              <ArrowUpRight className="h-4 w-4" />
            </Button>

            <div className="rounded-xl border border-dashed p-8">
              <h2 className="text-sm font-medium">No skills yet</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Upload your first spreadsheet to teach Forge how you work.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
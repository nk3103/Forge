# Engineering Decisions

# Project Brief

## The Problem

Spreadsheet cleaning is one of the most repetitive tasks in data work.

Analysts routinely receive recurring exports from CRMs, HR systems, finance platforms and internal databases. Although the data changes every day, the sequence of transformations required to prepare it for analysis rarely does.

Today these transformations are typically repeated manually, embedded in brittle scripts, or recreated through AI prompts every time a new spreadsheet arrives.

Forge approaches the problem differently.

Instead of treating every spreadsheet as a new AI problem, it treats every successful transformation as reusable knowledge. Users teach Forge once, review every proposed transformation before execution, and automatically reuse those workflows whenever similar datasets appear.

The goal is not simply to clean spreadsheets.

The goal is to eliminate repeated work.

---

# The Hard Problem

Generating spreadsheet transformations is no longer the interesting problem.

Modern language models are already capable of describing how data should be cleaned.

The difficult problem is executing those transformations safely.

A naive implementation would allow the LLM to directly mutate spreadsheet data. While this creates impressive demos, it introduces several issues:

- unpredictable execution
- hallucinated transformations
- impossible validation
- difficult debugging
- no deterministic replay
- no reusable workflows

Instead, Forge separates planning from execution.

The language model proposes a structured transformation plan.

Forge validates that plan, previews its effects, explains every operation, and deterministically executes it only after explicit user approval.

This separation became the central architectural decision of the project.

---

# The Slice

Rather than attempting to build a complete spreadsheet platform, I intentionally focused on one complete end-to-end workflow.

1. Upload a spreadsheet.
2. Describe the desired transformation in natural language.
3. Generate a structured execution plan.
4. Validate every proposed operation.
5. Preview the resulting dataset.
6. Apply the transformations.
7. Save the workflow.
8. Automatically recommend that workflow when similar datasets appear in the future.

Everything outside this journey was deliberately deprioritized.

---

# Why this instead of Prompt #1?

Prompt #1 focuses on extracting structured information from messy documents.

I intentionally focused on the equally common problem that follows immediately afterwards: preparing structured datasets for downstream analysis.

This direction allowed me to explore problems around explainable AI planning, deterministic execution, workflow learning and intelligent workflow reuse rather than OCR or document parsing.

It also let me demonstrate product thinking alongside system design.

---

# Engineering Decisions

---

# 1. AI generates plans instead of modifying datasets

## Alternatives

- Allow the language model to directly edit spreadsheet data.
- Generate executable code and evaluate it.

## Decision

AI is responsible only for planning.

Execution is handled entirely by Forge's deterministic operation engine.

## Reasoning

This decision enables:

- validation before execution
- explainable transformations
- preview generation
- deterministic replay
- reusable workflows
- meaningful testing

It also ensures the language model never silently mutates user data.

## Tradeoff

This architecture required significantly more engineering than directly applying AI output.

I accepted that complexity because explainability and trust were more valuable than implementation simplicity.

---

# 2. Transformations are represented as typed operations

## Alternatives

Store free-form prompts and regenerate transformations every time.

## Decision

Every transformation is represented as a strongly typed operation.

Examples include:

- Rename Column
- Delete Column
- Trim Whitespace
- Replace Text
- Uppercase
- Fill Missing Values

## Reasoning

Operations can be:

- validated
- previewed
- tested
- replayed
- composed
- versioned

This also makes the execution engine completely independent from the language model.

---

# 3. Preview before execution

## Alternatives

Immediately apply generated transformations.

## Decision

Every plan generates a preview dataset together with a visual dataset diff before execution.

## Reasoning

Spreadsheet transformations are often destructive.

Previewing changes dramatically increases user confidence while making mistakes inexpensive.

---

# 4. Validation is independent from execution

Validation and execution are intentionally separate systems.

Validation answers:

> Can this plan be executed?

Execution answers:

> Apply these already validated operations.

Separating these concerns simplified both implementations and improved testability.

---

# 5. Workflow matching is deterministic

## Alternatives

- embeddings
- semantic search
- vector databases

## Decision

Workflow matching compares:

- normalized column names
- schema overlap
- inferred column types

## Reasoning

For spreadsheet workflows these signals provide an inexpensive and explainable similarity heuristic.

They also avoid introducing additional infrastructure purely for matching.

---

# 6. Save operations instead of transformed datasets

## Alternatives

Persist transformed spreadsheets.

## Decision

Workflows persist only transformation operations.

## Reasoning

Operations represent reusable knowledge.

Datasets represent one execution.

Saving operations allows the same workflow to execute across many future datasets.

---

# 7. Schema-constrained AI output

## Alternatives

Accept arbitrary JSON from the language model.

## Decision

Planner responses are validated using Zod schemas before entering the execution pipeline.

## Reasoning

Invalid plans fail immediately rather than propagating unpredictable errors into execution.

---

# 8. Feature-first architecture

## Alternatives

Organize by technology layer.

## Decision

The project is organized around product capabilities.

Examples include:

- dataset
- planner
- workflow
- operations

## Reasoning

Each feature owns its planning, validation, UI and business logic.

This keeps modules cohesive while reducing coupling.

---

# 9. Local-first persistence

## Alternatives

Database-backed workflow storage.

## Decision

Workflow persistence uses Local Storage.

## Reasoning

Authentication and synchronization do not strengthen the core hypothesis being evaluated.

Local persistence kept the project focused on workflow learning instead of infrastructure.

---

# 10. Explainability over automation

Many AI spreadsheet tools optimize for one-click execution.

Forge intentionally requires user approval before every execution.

This slows the workflow slightly but dramatically improves trust.

The product optimizes for confidence rather than speed.

---

# 11. Workflow suggestions instead of repeated prompting

One of the core product goals was reducing repeated interaction with AI.

After users successfully clean one dataset, Forge stores that knowledge as a reusable workflow.

Future datasets are automatically matched against previously saved workflows.

If a sufficiently similar workflow exists, Forge recommends reusing it instead of generating a brand new AI plan.

This reduces latency, API cost and repeated prompting while creating a noticeably better user experience.

---

# What I intentionally did not build

Several features were intentionally left outside the scope of this submission.

- User accounts
- Cloud synchronization
- Workflow editing
- Undo / Redo
- Workflow versioning
- Team collaboration
- Embedding-based workflow matching
- Background execution
- Multi-sheet workbook support

These are valuable capabilities, but they do not strengthen the central hypothesis.

Given five days, I chose to build one complete workflow rather than many disconnected features.

---

# Reflection

The biggest lesson from this project was that AI planning and deterministic execution should be treated as separate concerns.

Early in development I considered allowing the language model to directly generate transformed datasets. While this simplified implementation, it eliminated opportunities for validation, explainability, deterministic replay and workflow reuse.

Separating planning from execution ultimately resulted in a more maintainable architecture, a safer user experience and a much stronger product story.

If I continued this project, my next investments would be:

- Undo / Redo
- Workflow editing
- Cloud synchronization
- Semantic workflow matching
- Team collaboration

Rather than expanding the list of supported spreadsheet operations.

# Forge

> **Teach spreadsheets once. Automate transformations repeatedly.**

Forge is an AI-assisted spreadsheet transformation platform that learns repeatable data cleaning workflows from user-approved transformations. Instead of repeatedly prompting an LLM or writing one-off scripts, users can save transformation workflows and automatically reuse them on similar datasets.

Unlike traditional AI spreadsheet tools, Forge never allows AI to directly modify data. AI is responsible only for generating a structured execution plan. Every transformation is validated, previewed, explained, and approved before execution.

---

## Why Forge?

Teams repeatedly receive exports from CRMs, HR systems, finance tools, and third-party vendors.

Although the data changes every day, the cleaning steps rarely do.

Examples include:

- Renaming inconsistent column names
- Removing whitespace
- Filling missing values
- Formatting text
- Standardizing datasets before analysis

Today these workflows are repeated manually, encoded in brittle scripts, or recreated through prompts every time.

Forge treats every transformation session as reusable knowledge.

---

## Core Principles

- **AI proposes. Users approve.**
- **Every transformation is explainable.**
- **Execution is deterministic.**
- **Workflows become reusable assets.**
- **Similar datasets should not require another prompt.**

---

# Features

### AI Planning

Describe the desired outcome in natural language.

Forge converts the request into a structured transformation plan using GPT-5.

Example:

> "Prepare this employee dataset for analysis."

↓

```
Rename Employee_Name → Employee Name

Trim whitespace

Fill missing managers

Uppercase department names

Round salary values
```

---

### Plan Validation

Every generated operation is validated before execution.

Forge detects problems such as:

- Missing columns
- Invalid operations
- Unsupported transformations

Invalid plans never reach execution.

---

### Explainable Execution

Each operation contains a human-readable explanation describing:

- what will happen
- why it is necessary

Users always understand why a transformation exists.

---

### Result Preview

Before applying any changes Forge generates a preview dataset together with a dataset diff highlighting:

- modified cells
- added columns
- removed columns

Execution is completely deterministic.

---

### Workflow Library

Approved plans can be saved as reusable workflows.

Each workflow stores:

- source prompt
- ordered transformation operations
- metadata
- usage statistics

---

### Intelligent Workflow Suggestions

When a new dataset is uploaded Forge automatically compares it against previously saved workflows.

Matching is deterministic and based on:

- normalized column names
- schema similarity
- inferred column types

If a sufficiently similar workflow exists, Forge recommends reusing it without invoking AI.

This makes repeat transformations:

- faster
- cheaper
- explainable

---

# Architecture

```
Dataset

        │

        ▼

AI Planner (GPT-5)

        │

        ▼

Structured Operation Plan

        │

        ▼

Validation

        │

        ▼

Preview + Diff

        │

        ▼

User Approval

        │

        ▼

Deterministic Operation Engine

        │

        ▼

Workflow Library

        │

        ▼

Workflow Matcher
```

The language model never mutates user data directly.

All transformations are executed through a deterministic operation engine.

---

# Supported Operations

Current operations include:

- Rename Column
- Delete Column
- Trim Whitespace
- Replace Text
- Uppercase
- Lowercase
- Title Case
- Fill Missing Values
- Remove Empty Rows
- Concatenate Columns
- Split Column
- Round Numbers

The architecture is operation-driven, making new transformations easy to add.

---

# Technology Stack

Frontend

- Next.js
- React
- TypeScript
- TailwindCSS

AI

- OpenAI GPT-5
- Structured JSON generation using Zod schemas

Spreadsheet

- PapaParse
- Custom deterministic transformation engine

Testing

- Vitest

---

# Running Locally

Clone the repository

```bash
git clone https://github.com/<username>/forge.git
cd forge
```

Install dependencies

```bash
pnpm install
```

Configure environment variables

```
OPENAI_API_KEY=...
```

Start the development server

```bash
pnpm dev
```

---

# Project Structure

```
apps/
    web/

packages/

features/

docs/
```

The project follows a feature-first architecture where planning, operations, datasets, and workflows are isolated into independent modules.

---

# Future Improvements

Some capabilities were intentionally left outside the scope of this project:

- Cloud workflow synchronization
- Team workspaces
- Workflow versioning
- Undo / Redo
- Workflow editing
- Semantic workflow matching using embeddings
- Background execution
- Multi-sheet workbook support

The goal of this submission was to build one complete end-to-end experience rather than a broad collection of partially finished features.

---

# License

MIT

# Forge

Version: v1 (In Development)

---

# Vision

Forge is an AI-first spreadsheet transformation platform.

Instead of manually editing spreadsheets through formulas, filters and repetitive actions, users describe the desired transformation in natural language.

Forge converts those requests into deterministic transformation workflows that users can:

- inspect
- edit
- validate
- preview
- execute
- save
- reuse

The AI is responsible for planning.

The application is responsible for execution.

The user always remains in control.

---

# Product Principles

Forge follows five principles.

## 1. AI suggests

AI never directly edits datasets.

It proposes operations.

---

## 2. Humans approve

Every generated workflow is visible.

Every step can be inspected.

Every step can be edited.

---

## 3. Execution is deterministic

Given

Dataset

+

Operations

the output should always be identical.

Execution never depends on AI.

---

## 4. Everything is previewable

Users should never execute a transformation blindly.

Every workflow produces:

- validation
- preview
- change summary
- visual diff

before execution.

---

## 5. Workflows become assets

Every useful workflow can later become reusable.

Eventually Forge should recommend previously saved workflows before asking AI to generate a new one.

---

# High-Level User Journey

Upload Dataset

↓

AI Prompt

↓

Generated Plan

↓

Validation

↓

Editable Plan

↓

Preview

↓

Diff

↓

Apply

↓

Save Workflow

↓

Reuse Workflow

---

# Current Feature Set

Dataset

- CSV Upload
- Dataset Model
- Table Rendering

Planner

- OpenAI Planner
- Planner Schema
- Planner Validation
- Confidence

Execution

- Rename Column
- Trim Whitespace

Preview

- Generated Dataset
- Dataset Diff
- Change Summary
- Visual Highlighting

Editing

- Editable Plans

---

# Current Priorities

Current milestone is expanding the operation catalog.

Upcoming operations include:

- Delete Column
- Replace Text
- Uppercase
- Lowercase
- Title Case
- Fill Missing Values
- Remove Duplicate Rows
- Concatenate Columns
- Split Column

---

# Long-Term Vision

Forge should evolve from an AI spreadsheet assistant into a reusable workflow platform.

Eventually the preferred experience should become:

Upload Dataset

↓

Suggested Existing Workflow

↓

One Click Apply

↓

Only use AI when no suitable workflow exists.

AI should become the exception.

Reusable workflows should become the default.
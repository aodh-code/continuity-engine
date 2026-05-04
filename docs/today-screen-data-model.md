# Today / Re-entry Screen Data Model

## Purpose
Define the minimum believable data model needed to power the Today / Re-entry screen truthfully.

The goal is not to model all of life.
The goal is to support a screen that can answer:
- what matters now
- what changed
- what is drifting
- what is waiting
- what the next real move is

## Design principles
- Prefer a small number of durable entities.
- Separate raw inputs from distilled continuity state.
- Model live vs stale truth explicitly.
- Preserve room for agent interpretation without making the data model fuzzy.
- Optimise for Brendan-first use, but keep the shape generalisable later.

## Core entities

### 1. Project
Represents a meaningful area of ongoing work.

Fields:
- id
- title
- slug
- description
- status (`active`, `paused`, `blocked`, `completed`, `archived`)
- importance (`high`, `medium`, `low`)
- owner
- started_at
- updated_at
- archived_at

Derived ideas:
- has_live_priority
- has_drift
- last_meaningful_activity_at

Notes:
A project is broader than a task. It is a continuity container.

---

### 2. Priority
Represents something that currently matters enough to appear on the Today screen.

Fields:
- id
- title
- summary
- reason_it_matters
- status (`live`, `waiting`, `blocked`, `done`, `retired`)
- urgency (`now`, `soon`, `later`)
- project_id (nullable)
- source_type (`manual`, `agent`, `derived`)
- created_at
- updated_at
- expires_at (nullable)

Derived ideas:
- confidence_score
- should_show_today
- is_stale

Notes:
A priority is not just a task. It is a current claim on attention.

---

### 3. OpenLoop
Represents an unresolved thread with ongoing cognitive claim.

Fields:
- id
- title
- description
- state (`open`, `waiting`, `blocked`, `stale`, `closed`)
- waiting_on_type (`self`, `person`, `system`, `external`, `unknown`)
- waiting_on_label (nullable)
- project_id (nullable)
- linked_priority_id (nullable)
- surfaced_at
- last_touched_at
- closed_at (nullable)

Derived ideas:
- age_days
- deserves_attention
- likely_dead

Notes:
Open loops are central. Many continuity failures are really open-loop failures.

---

### 4. ChangeEvent
Represents something that changed since the last meaningful check-in.

Fields:
- id
- entity_type (`project`, `priority`, `loop`, `integration`, `reflection`, `agent_run`)
- entity_id
- title
- summary
- significance (`high`, `medium`, `low`)
- happened_at
- source_type (`system`, `agent`, `user`, `integration`)

Derived ideas:
- should_surface_in_today

Notes:
This powers the “what changed” block.

---

### 5. DriftSignal
Represents a mismatch between apparent state and actual state.

Fields:
- id
- target_type (`project`, `priority`, `loop`, `surface`, `integration`)
- target_id (nullable)
- title
- description
- severity (`low`, `medium`, `high`)
- state (`active`, `acknowledged`, `resolved`, `ignored`)
- detected_at
- resolved_at (nullable)

Derived ideas:
- trust_risk
- should_interrupt

Notes:
Drift is not failure. Drift is truth decay.

---

### 6. NextMove
Represents the system’s best current recommendation for forward motion.

Fields:
- id
- title
- rationale
- action_type (`open_project`, `do_task`, `send_message`, `review`, `cleanup`, `reflect`, `custom`)
- target_type (nullable)
- target_id (nullable)
- source_type (`agent`, `manual`, `derived`)
- confidence (`high`, `medium`, `low`)
- created_at
- accepted_at (nullable)
- dismissed_at (nullable)

Notes:
There may be several candidates internally, but only one should usually be surfaced.

---

### 7. ReflectionEntry
Represents a lightweight human check-in or diary fragment that can affect continuity.

Fields:
- id
- body
- tone (nullable)
- energy_state (nullable)
- created_at
- source (`manual`, `imported`, `voice`, `agent-assisted`)

Derived ideas:
- contains_carry_forward_signal
- contains_emotional_context

Notes:
Reflection is not just journaling. It helps color today’s interpretation.

---

### 8. SessionSnapshot
Represents a re-entry boundary.

Fields:
- id
- opened_at
- closed_at (nullable)
- summary
- mode (`morning`, `midday`, `evening`, `return_after_drift`, `ad_hoc`)
- generated_today_summary (nullable)

Notes:
This lets the system reason about “since you were last here”.

## Supporting relations

### Project -> Priority
One project can have many priorities.
A priority may belong to no project if it is life-level rather than project-level.

### Project -> OpenLoop
One project can have many open loops.

### Priority -> OpenLoop
A priority may have related loops.

### SessionSnapshot -> ChangeEvent
A session can surface a set of relevant changes.

### SessionSnapshot -> NextMove
A session may produce one recommended next move.

## Raw input vs distilled state
Important separation:

### Raw inputs
- markdown files
- GitHub issues
- reminders
- calendar events
- agent logs
- diary notes

### Distilled state
- priorities
- open loops
- drift signals
- next move
- today summary

The Today screen should mostly read from distilled state, not raw sources.

## Minimum V1 schema recommendation
If keeping this lean, V1 can start with just:
- projects
- priorities
- open_loops
- change_events
- drift_signals
- next_moves
- reflection_entries
- session_snapshots

That is enough to make the screen real.

## Key modeling decision
The most important choice is this:

**Do not treat tasks as the primary unit.**

The primary units are:
- priorities
- loops
- drift
- next move

Tasks may exist later, but they are not the soul of the product.

## What this unlocks
With this model, the Today screen can truthfully show:
- the top 3 live priorities
- what changed since last check-in
- what unresolved loops remain
- what is drifting
- the next real move
- emotional context when relevant

## Next design question
Now that the model exists, the next useful step is:

**define the actual Today screen blocks and their exact data bindings**

That means:
- which entity powers which block
- what ranking logic is needed
- what gets hidden by default
- how the screen stays calm instead of noisy

# Today / Re-entry Screen Blocks and Data Bindings

## Purpose
Translate the Today / Re-entry screen into exact UI blocks, data sources, ranking logic, and calmness rules.

This document answers:
- what appears on the Today screen
- what powers each block
- what gets shown or hidden
- how the screen avoids becoming noisy or admin-heavy

## Design goal
The Today screen should feel like:
- orientation
- continuity
- clarity
- forward motion

It should not feel like:
- a dashboard
- a task dump
- a control panel
- a nag machine

## Screen order
1. Re-entry Header
2. Top Priorities
3. Next Real Move
4. What Changed
5. Open Loops
6. Drift Alerts
7. Reflection / Arrival Note

This order is intentional.
The screen should begin with orientation and momentum before showing unresolved complexity.

---

## 1. Re-entry Header

### Purpose
Give an immediate sense of where the user is and what kind of day/state this is.

### Data sources
- `session_snapshots`
- `priorities`
- `open_loops`
- `drift_signals`
- `reflection_entries` (recent)

### Fields shown
- greeting / contextual sentence
- count of live priorities
- count of open loops needing attention
- count of active drift signals
- optional time-away indicator
- optional short orientation summary

### Example output
- You have 3 live priorities, 2 active loops, and 1 thing drifting.
- You have been away for 2 days. The clearest next move is to reopen continuity-engine design.

### Logic
- Live priorities = `priorities where status = live and should_show_today = true`
- Active loops = `open_loops where state in (open, blocked, waiting) and deserves_attention = true`
- Drift count = `drift_signals where state = active and severity != low OR trust_risk high`
- Time away = difference between now and latest `session_snapshot.closed_at`

### Calmness rules
- Do not show more than one summary sentence.
- Do not show all counts if zero.
- Avoid red/error framing unless severity is genuinely high.

---

## 2. Top Priorities

### Purpose
Surface the 1 to 3 things that most deserve real attention now.

### Data source
- `priorities`

### Fields shown per item
- title
- short summary
- reason it matters
- state label
- next step hint
- linked project if relevant

### Ranking logic
Rank by:
1. `should_show_today = true`
2. `status = live`
3. `urgency` (`now` > `soon` > `later`)
4. manual pin / importance
5. recency of meaningful activity
6. agent confidence score

### Visibility rules
- show max 3 priorities
- do not show `done` or `retired`
- avoid showing stale priorities unless explicitly revived

### Calmness rules
- each priority must fit in a compact card
- no long task lists inside cards
- no more than one CTA per priority

---

## 3. Next Real Move

### Purpose
Anchor the screen behaviourally with one best next action.

### Data source
- `next_moves`
- optionally supported by `priorities`, `open_loops`, `drift_signals`

### Fields shown
- title
- rationale
- action button / route
- optional linked project

### Selection logic
Choose one `next_move` with highest:
- confidence
- relevance to live priorities
- low ambiguity
- high leverage
- realistic executability in current context

### Visibility rules
- show exactly 1 primary move
- optionally show 1 alternate secondary move behind expand

### Calmness rules
- never present this as a giant plan
- never show more than one primary recommendation
- rationale should be one sentence

---

## 4. What Changed

### Purpose
Reduce restart cost by showing meaningful movement since the user was last here.

### Data source
- `change_events`
- bounded by latest `session_snapshot`

### Fields shown per item
- title
- summary
- happened_at
- significance

### Ranking logic
Rank by:
1. significance
2. recency
3. relation to live priorities/projects

### Visibility rules
- show max 3 to 5 changes
- hide low-significance noise by default
- collapse repeated similar changes into one summary row if needed

### Calmness rules
- do not stream logs
- do not show every agent event
- show only meaningful continuity-relevant changes

---

## 5. Open Loops

### Purpose
Make unresolved threads visible without turning them into a guilt swamp.

### Data source
- `open_loops`

### Fields shown per item
- title
- short description
- current state
- waiting on who/what
- age indicator if useful

### Ranking logic
Rank by:
1. `deserves_attention = true`
2. state (`blocked` and `waiting` often outrank generic `open`)
3. age_days
4. relationship to live priorities

### Visibility rules
- show max 5 loops by default
- collapse stale/low-importance loops behind “show more”
- clearly distinguish waiting vs blocked vs stale

### Calmness rules
- no accusatory language
- stale loops should invite closure, not shame
- if there are zero important loops, hide the section entirely

---

## 6. Drift Alerts

### Purpose
Show where the system’s apparent truth is decaying.

### Data source
- `drift_signals`

### Fields shown per item
- title
- short explanation
- severity
- suggested correction

### Ranking logic
Rank by:
1. severity
2. trust_risk
3. age
4. whether it affects a live project or Today surface

### Visibility rules
- show max 3 active drift alerts
- only show low severity if there are no medium/high items
- resolved/ignored items should be hidden from main view

### Calmness rules
- the tone must be factual, not panicked
- drift is framed as maintenance, not failure
- section may be hidden entirely when no meaningful drift exists

---

## 7. Reflection / Arrival Note

### Purpose
Capture how the person is arriving, so the system can contextualize the day.

### Data source
- latest `reflection_entries`
- optional manual entry state

### Fields shown
- recent short reflection snippet or empty prompt
- optional energy state
- quick add affordance

### Visibility rules
- keep minimal by default
- never dominate the screen
- if there is a recent reflection, show only a compact excerpt

### Calmness rules
- should feel invitational, not mandatory
- avoid forcing mood tracking rituals

---

## Hidden by default
To keep the Today screen calm, the following should not appear unless expanded or explicitly opened:
- raw task lists
- full project boards
- historical logs
- all reminders
- all diary entries
- low-significance agent activity
- deeply nested metadata

## Cross-block rules

### Rule 1: No duplicate attention claims
If something is shown as the `Next Real Move`, it should not also dominate `Top Priorities` and `Open Loops` visually.

### Rule 2: Distill before display
Raw inputs should be transformed into continuity entities first.
The Today screen is not a raw data surface.

### Rule 3: Prefer small truthful summaries
A small true summary is better than exhaustive coverage.

### Rule 4: Hide zero-value sections
If a section has nothing meaningful to say, hide it.
Do not preserve symmetry just for design neatness.

### Rule 5: Support re-entry after drift
Everything on this screen should reduce restart cost.
If a block does not help re-entry, it does not belong here.

## Example screen composition

### Good state
- Header: 3 live priorities, 1 drift signal
- Priorities: continuity-engine, Finland travel, ops truth cleanup
- Next move: define Today screen ranking rules
- What changed: repo created, data model pushed, Tandem restored
- Open loops: flights still unresolved, stale backups surface
- Drift alerts: TODO upcoming section no longer truthful
- Reflection: “Arriving a bit scattered but clear enough”

### Bad state
- 17 tasks
- 9 reminders
- 6 logs
- 4 warnings
- 3 charts
- generic AI summary paragraph

That would kill the product.

## Implementation implication
The UI layer will need:
- aggregation queries for each block
- ranking functions for priorities, loops, changes, drift, next move
- explicit hiding rules
- one Today payload, likely assembled server-side

## Next step
Now that the screen is bound to the model, the next step is:

**define the first implementation plan for V1**

That means:
- repo structure
- app routes
- schema/tables
- first backend queries
- first frontend components
- what to ship in the first usable cut

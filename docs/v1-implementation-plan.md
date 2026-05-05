# V1 Implementation Plan

## Purpose
Turn the current product/design spine into the smallest believable working app.

This plan is for V1, not the finished vision.
The goal is to ship the first usable Brendan-first continuity app with a real Today / Re-entry screen.

## V1 product promise
When Brendan opens the app, he should be able to:
- understand what matters now
- see what changed since last check-in
- notice what is drifting
- identify one next real move
- feel oriented in under a minute

## V1 scope
### In scope
- authentication for a single private user initially
- Today / Re-entry screen
- projects
- priorities
- open loops
- drift signals
- next move
- lightweight reflection entry
- session snapshots
- simple manual CRUD where needed

### Out of scope for V1
- multi-user polished productization
- team collaboration
- full AI autonomy
- generic chat interface
- complex calendar sync
- fully automatic identity extraction pipeline
- mobile native app
- elaborate notification system

## Recommended stack
- Next.js
- TypeScript
- Tailwind
- Supabase (Postgres/Auth/Storage)
- PWA-first UI

## Proposed app structure

### App routes
- `/` → Today / Re-entry screen
- `/projects` → projects list
- `/projects/[slug]` → project detail
- `/loops` → open loops view
- `/reflection` → reflection log
- `/settings` → profile / data / integrations later

### UI component groups
- `components/today/`
- `components/projects/`
- `components/loops/`
- `components/reflection/`
- `components/ui/`

### Data/service layer
- `lib/supabase/`
- `lib/domain/`
- `lib/today/`
- `lib/ranking/`
- `lib/types/`

### Domain modules
- `projects.ts`
- `priorities.ts`
- `open-loops.ts`
- `change-events.ts`
- `drift-signals.ts`
- `next-moves.ts`
- `reflection.ts`
- `session-snapshots.ts`

## Database plan

### Core tables for V1
1. `projects`
2. `priorities`
3. `open_loops`
4. `change_events`
5. `drift_signals`
6. `next_moves`
7. `reflection_entries`
8. `session_snapshots`

### Suggested V1 simplifications
- single-user assumptions allowed in schema initially
- nullable foreign keys where appropriate
- no over-normalization yet
- use enum-like text fields first if faster

## First backend queries needed

### Today payload query
Build a server-side aggregator that returns:
- re-entry header summary
- top priorities (max 3)
- primary next move
- recent meaningful changes (max 5)
- attention-worthy open loops (max 5)
- active drift signals (max 3)
- latest reflection excerpt

This should likely be assembled in:
- `lib/today/getTodayPayload.ts`

### Supporting query functions
- `getTopPriorities()`
- `getNextMove()`
- `getRecentChanges()`
- `getAttentionOpenLoops()`
- `getActiveDriftSignals()`
- `getLatestReflection()`
- `getLatestSessionSnapshot()`

## First frontend components

### Today screen components
- `ReentryHeader.tsx`
- `TopPriorities.tsx`
- `NextRealMove.tsx`
- `WhatChanged.tsx`
- `OpenLoops.tsx`
- `DriftAlerts.tsx`
- `ArrivalNote.tsx`

### Supporting UI
- `PriorityCard.tsx`
- `LoopCard.tsx`
- `DriftCard.tsx`
- `SectionShell.tsx`
- `EmptyState.tsx`

## First usable cut
The smallest believable V1 should do this:

1. Brendan signs in.
2. Brendan lands on the Today screen.
3. The screen loads structured continuity state from Supabase.
4. Brendan can:
   - view top priorities
   - view one recommended next move
   - see open loops and drift
   - add a reflection note
   - open a project
5. Session open/close can be tracked simply.

That is enough to test the core promise.

## Recommended build phases

### Phase 1: App skeleton
- scaffold Next.js app
- install Tailwind
- connect Supabase
- create auth guard
- create base layout
- create empty routes

### Phase 2: Schema + seed data
- create the 8 core tables
- define TypeScript types
- insert manual Brendan-first seed data
- ensure the Today payload can be assembled

### Phase 3: Today screen first
- build Today route UI
- wire server-side payload
- implement calm layout
- test with realistic seeded data

### Phase 4: Editing surfaces
- simple CRUD for projects, priorities, loops, reflections
- enough admin capability to keep the system truthful

### Phase 5: First real usage loop
- use it daily
- refine ranking logic
- refine wording and emotional feel
- identify what is missing vs noisy

## Seed-data strategy
Do not wait for full ingestion automation.
Seed the app manually first with:
- 3 to 5 real projects
- 3 live priorities
- 3 to 5 open loops
- 2 to 3 drift signals
- 1 next move
- a handful of reflection entries

This will let the Today screen become real quickly.

## Critical product rule
Do not overbuild ingestion before the Today screen feels right.
The screen is the product test.
Automation only earns its place after that.

## First engineering milestone
A good first milestone is:

**Brendan can open a working private web app and see a believable Today / Re-entry screen populated from Supabase.**

If that works, the project is alive.

## Recommended immediate next step
The next concrete move after this plan is:

**create the actual Next.js app scaffold and initial Supabase schema issue list**

That is the point where design turns into implementation.

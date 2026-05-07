const topPriorities = [
  {
    title: "Continuity-engine implementation",
    summary: "Turn the design spine into a working Today / Re-entry app shell.",
    state: "live",
    next: "Wire the first Today payload and screen components.",
  },
  {
    title: "Mindline app recovery",
    summary: "Get the Expo + Supabase setup running cleanly again.",
    state: "waiting",
    next: "Verify startup command, env wiring, and local Expo path.",
  },
  {
    title: "Workspace truth restoration",
    summary: "Restore trust in stale TODO, REMINDERS, BACKUPS, and KANBAN surfaces.",
    state: "drifting",
    next: "Run one cleanup pass on the most stale files first.",
  },
];

const changes = [
  "Created and pushed continuity-engine repo and core concept docs.",
  "Defined Today screen data model and block bindings.",
  "Added V1 implementation plan and opened the first implementation issues.",
];

const loops = [
  "Seed real continuity data so the Today screen can be evaluated truthfully.",
  "Decide whether KANBAN.md should be refreshed or retired.",
  "Get Mindline running locally again without Expo/tunnel confusion.",
];

const drift = [
  "BACKUPS.md and REMINDERS.md still no longer reflect reality cleanly.",
  "TODO.md still has April items under Upcoming.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-10 sm:px-10">
        <header className="space-y-3 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Today / Re-entry</p>
          <h1 className="text-3xl font-semibold tracking-tight">You have 3 live priorities, 3 open loops, and 2 trust drifts.</h1>
          <p className="max-w-3xl text-base leading-7 text-stone-600">
            The clearest next move is to turn continuity-engine from paper architecture into a living app shell.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Top priorities</h2>
                <span className="text-sm text-stone-500">3 live</span>
              </div>
              <div className="space-y-4">
                {topPriorities.map((priority) => (
                  <article key={priority.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-medium">{priority.title}</h3>
                      <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-stone-700">
                        {priority.state}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-stone-700">{priority.summary}</p>
                    <p className="mt-3 text-sm text-stone-500">Next: {priority.next}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">What changed</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
                {changes.map((item) => (
                  <li key={item} className="rounded-2xl bg-stone-50 px-4 py-3">{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Next real move</h2>
              <p className="mt-3 text-base leading-7 text-stone-700">
                Scaffold the first working Today screen components and wire them to a typed server-side payload.
              </p>
              <p className="mt-4 text-sm text-stone-500">
                Why this now: it is the smallest move that turns the product from thoughtful documents into lived software.
              </p>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Open loops</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
                {loops.map((item) => (
                  <li key={item} className="rounded-2xl bg-stone-50 px-4 py-3">{item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Drift alerts</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
                {drift.map((item) => (
                  <li key={item} className="rounded-2xl bg-amber-50 px-4 py-3 text-amber-900">{item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Arrival note</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Arriving with good momentum. The shape is clear enough now that implementation is the honest next act.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

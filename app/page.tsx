"use client";

import { useState } from "react";

type Step = { label: string; instruction: string; duration: string };
type Runbook = { id: string; code: string; name: string; owner: string; cadence: string; tone: string; steps: Step[] };

const runbooks: Runbook[] = [
  { id: "release", code: "RB-07", name: "Release checklist", owner: "Book Dev", cadence: "Friday / before publish", tone: "ship with a reversible door", steps: [
    { label: "Read the diff", instruction: "Scan the changed files and name the one behavior that could surprise a visitor.", duration: "08 min" },
    { label: "Run the narrow check", instruction: "Run the smallest relevant test, then keep the output attached to this release note.", duration: "06 min" },
    { label: "Open the preview", instruction: "Check the production-shaped preview at desktop and phone widths before promoting it.", duration: "12 min" },
    { label: "Write the rollback", instruction: "Leave one sentence that says exactly how to return to the last known-good commit.", duration: "04 min" },
  ] },
  { id: "content", code: "RB-12", name: "Content handoff", owner: "Book Content", cadence: "Tuesday / 10:30", tone: "make the source easy to trust", steps: [
    { label: "Check the source", instruction: "Confirm the draft has one source link, one owner, and one clear audience.", duration: "05 min" },
    { label: "Cut the throat", instruction: "Remove the first sentence if the second sentence says the useful thing more directly.", duration: "07 min" },
    { label: "Package the handoff", instruction: "Add the title, format, destination, and a single next action to the delivery note.", duration: "08 min" },
  ] },
  { id: "review", code: "RB-19", name: "Weekly review", owner: "Solo Empire", cadence: "Monday / first hour", tone: "notice the system before it shouts", steps: [
    { label: "Read the ledger", instruction: "Review the last seven days of commitments before adding anything new.", duration: "10 min" },
    { label: "Name the drag", instruction: "Choose one repeated friction point that deserves a smaller or clearer rule.", duration: "06 min" },
    { label: "Choose the bet", instruction: "Write one outcome for this week and the evidence that would make it feel real.", duration: "05 min" },
  ] },
];

export default function Home() {
  const [runbookId, setRunbookId] = useState("release");
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState<Record<string, number[]>>({});
  const runbook = runbooks.find((item) => item.id === runbookId) ?? runbooks[0];
  const finished = completed[runbook.id] ?? [];
  const step = runbook.steps[stepIndex] ?? runbook.steps[0];
  const isDone = finished.includes(stepIndex);

  function chooseRunbook(id: string) { setRunbookId(id); setStepIndex(0); }
  function markNext() {
    const next = Array.from(new Set([...finished, stepIndex]));
    setCompleted((current) => ({ ...current, [runbook.id]: next }));
    if (stepIndex < runbook.steps.length - 1) setStepIndex((current) => current + 1);
  }
  function resetRunbook() { setCompleted((current) => ({ ...current, [runbook.id]: [] })); setStepIndex(0); }

  return (
    <main className="ops-page">
      <div className="ops-frame">
        <header className="ops-header">
          <div className="ops-brand"><span className="ops-mark">OC</span><span>OPS CENTER</span></div>
          <div className="ops-header-note"><span className="signal-dot" />LOCAL STUDY / NO LIVE CONNECTION</div>
          <span className="ops-clock">08:42 BKK</span>
        </header>
        <section className="ops-intro"><div><h1>Make the next<br /><strong>safe move.</strong></h1><p>Runbooks for a solo operation that needs memory outside the operator.</p></div><div className="ops-intro-rule"><span>ACTIVE RUNBOOK</span><strong>{runbook.code}</strong><small>{runbook.cadence}</small></div></section>
        <section className="ops-console" aria-label="Runbook control room">
          <aside className="runbook-rail"><div className="rail-heading"><span>RUNBOOKS</span><b>{runbooks.length} READY</b></div>{runbooks.map((item) => { const count = (completed[item.id] ?? []).length; return <button key={item.id} type="button" className={item.id === runbook.id ? "runbook-row is-active" : "runbook-row"} onClick={() => chooseRunbook(item.id)} aria-pressed={item.id === runbook.id}><span className="runbook-code">{item.code}</span><strong>{item.name}</strong><small>{item.owner} / {item.cadence}</small><b>{count}/{item.steps.length}</b></button>; })}<div className="rail-foot"><span>RULE OF THE ROOM</span><p>One checked action is more useful than a complete-looking dashboard.</p></div></aside>
          <div className="procedure-sheet"><div className="sheet-top"><div><span className="sheet-label">CURRENT PROCEDURE</span><h2>{runbook.name}</h2><p>{runbook.tone}</p></div><span className="sheet-owner">OWNER<br /><strong>{runbook.owner}</strong></span></div><div className="step-list">{runbook.steps.map((item, index) => <button key={item.label} type="button" className={index === stepIndex ? "procedure-step is-focused" : "procedure-step"} onClick={() => setStepIndex(index)} aria-pressed={index === stepIndex}><span className={finished.includes(index) ? "step-mark is-checked" : "step-mark"}>{finished.includes(index) ? "OK" : "--"}</span><span className="step-order">{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><small>{item.duration}</small></button>)}</div><div className="focus-note"><span className="sheet-label">FOCUS INSTRUCTION</span><h3>{step.label}</h3><p>{step.instruction}</p><div className="focus-actions"><button className="primary-action" type="button" onClick={markNext} disabled={isDone}>{isDone ? "Step checked" : stepIndex === runbook.steps.length - 1 ? "Check final step" : "Check and move on"}</button><button className="quiet-action" type="button" onClick={resetRunbook}>Reset runbook</button></div></div></div>
          <aside className="status-panel"><div className="panel-heading"><span>ROOM STATUS</span><span className="status-live">STUDY</span></div><div className="status-signal"><span className="signal-ring">{finished.length}</span><div><strong>{finished.length === runbook.steps.length ? "CLEAR TO CLOSE" : "IN PROGRESS"}</strong><small>{finished.length} of {runbook.steps.length} steps checked</small></div></div><div className="status-lines"><div><span>CADENCE</span><strong>{runbook.cadence}</strong></div><div><span>LAST REVIEW</span><strong>Today / local</strong></div><div><span>DATA BOUNDARY</span><strong>Illustrative only</strong></div></div><div className="status-note"><span>OPERATOR NOTE</span><p>Nothing here pings a service. It makes the next decision legible.</p></div></aside>
        </section>
        <footer className="ops-footer"><span>BOOKCHAOWALIT / OPS CENTER</span><span>RUNBOOK CONTROL ROOM · SYNTHETIC DATA</span></footer>
      </div>
    </main>
  );
}

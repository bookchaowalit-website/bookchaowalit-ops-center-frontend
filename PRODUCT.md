# Product: Ops Center — Runbook Control Room

## Product surface

Ops Center is an illustrative solo-operations control room for choosing a runbook, checking the current step, and recording the next safe action.

## Primary user

An operator moving between recurring workflows who needs the right procedure visible without pretending that the system is connected to live infrastructure.

## Product promise

Turn an operational intention into a checked next step, not a dashboard full of disconnected status numbers.

## Boundaries

- Use synthetic workflows, owners, and timestamps only.
- Do not imply live monitoring, automation, or incident access.
- The demo is a product design study, not an infrastructure console.

## Design mode

operate

## Interaction contract

- Selecting a runbook changes the current procedure and readiness readout.
- Selecting a procedure step changes the focus instruction.
- The next-action control checks the step locally and advances the focus.

---
sidebar_position: 1
title: Overview
---

A **policy** is a pluggable object that DMR calls every iteration to decide whether the job should expand, shrink, or stay at its current size.

## How it works

Every iteration your application calls `dmr_check(USE_POLICY)`. DMR calls two callbacks on the active policy in sequence:

1. **`populate(policy, runtime)`** — gather external information (TALP metrics, queue state, …). Called on *every* MPI rank; may be `NULL`.
2. **`run(policy, context)`** — pure decision: return a `DMRPolicySuggestion` (stay / expand N nodes / shrink N nodes). Must be deterministic.

```
dmr_check(USE_POLICY)
    └─ populate(policy, runtime)   ← all ranks
    └─ run(policy, context)        ← all ranks
    └─ root applies suggestion
    └─ returns DMRAction to caller
```

## Registering a policy

`dmr_set_policy` is **collective** — all ranks must call it:

```c
dmr_set_policy(dmr_policy_round());
```

## Choosing a policy

| Policy | Best for |
|--------|----------|
| `dmr_policy_always_stay()` | Debugging — disables all reconfigurations |
| `dmr_policy_list()` | Testing a fixed sequence of node counts |
| `dmr_policy_round()` | General use — scales up by a stride, wraps to min |
| `dmr_policy_ce()` | Production — targets a communication efficiency threshold (requires TALP) |

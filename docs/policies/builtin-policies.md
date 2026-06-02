---
sidebar_position: 2
title: Built-in Policies
---

## always_stay

```c
DMRPolicy *dmr_policy_always_stay(void);
```

Never reconfigures. Useful for disabling reconfiguration during debugging.

## list

```c
DMRPolicy *dmr_policy_list(void);
```

Cycles through a fixed list of node counts in order, then repeats. Useful for benchmarking.

| Variable | Default | Description |
|----------|---------|-------------|
| `DMR_DEFAULT_POLICY_MIN` | `1` | Start of the list |
| `DMR_DEFAULT_POLICY_MAX` | `1` | End of the list |

## round

```c
DMRPolicy *dmr_policy_round(void);
```

Multiplies the current node count by `DMR_DEFAULT_POLICY_STRIDE` each step. Wraps back to `min_nodes` when `max_nodes` is exceeded.

| Variable | Default | Description |
|----------|---------|-------------|
| `DMR_DEFAULT_POLICY_MIN` | `1` | Minimum nodes; wrap target |
| `DMR_DEFAULT_POLICY_MAX` | `1` | Maximum nodes; wrap threshold |
| `DMR_DEFAULT_POLICY_STRIDE` | `2` | Multiplier applied each step |

**Example:** `MIN=1`, `MAX=8`, `STRIDE=2` → sequence: 1 → 2 → 4 → 8 → 1 → …

## ce (Communication Efficiency)

```c
#if defined(COMPILED_WITH_TALP)
DMRPolicy *dmr_policy_ce(void);
#endif
```

Measures the application's communication efficiency and adjusts node count to keep it near a target. Requires `DMR_USE_TALP=1`.

| Variable | Default | Description |
|----------|---------|-------------|
| `DMR_DEFAULT_POLICY_MIN` | `1` | Minimum nodes |
| `DMR_DEFAULT_POLICY_MAX` | `1` | Maximum nodes |
| `DMR_TALP_TARGET_CE` | `0.8` | Target communication efficiency (0–1) |
| `DMR_TALP_SENSITIVITY` | `15` | Adjustment sensitivity |

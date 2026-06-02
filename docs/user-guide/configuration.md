---
sidebar_position: 4
title: Configuration
---

DMR can be configured at **compile time** (CMake flags) and at **runtime** (environment variables).

## Compile-time options

```bash
cmake -B build \
  -DDMR_PROCS_PER_NODE=112 \
  -DDMR_USE_TALP=1 \
  -DDLB_ROOT=$DLB_ROOT
```

| CMake flag | Default | Description |
|------------|---------|-------------|
| `DMR_PROCS_PER_NODE` | `1` | Processes spawned per node added in an expand |
| `DMR_USE_TALP` | `0` | Compile with DLB/TALP support (enables the `ce` policy) |
| `DMR_CHECKPOINT_RESTART` | `0` | Use checkpoint-restart for reconfigurations |
| `DMR_JOBS_CAN_SHRINK` | `1` | Enable Slurm job shrinking |

## Runtime environment variables

### Debug and analytics

| Variable | Default | Description |
|----------|---------|-------------|
| `DMR_DEBUG_LEVEL` | `0` | `0` = off, `1` = rank 0 only, `2` = all ranks |
| `DMR_PRINT_ANALYTICS` | `0` | Print analytics at each reconfiguration when set to `1` |

### Reconfiguration sizes

| Variable | Default | Description |
|----------|---------|-------------|
| `DMR_NODES_IN_EXPAND` | `1` | Nodes to request per expand step |
| `DMR_NODES_IN_SHRINK` | `1` | Nodes to release per shrink step |

### Policy defaults

| Variable | Default | Description |
|----------|---------|-------------|
| `DMR_DEFAULT_POLICY_MIN` | `1` | Minimum node count |
| `DMR_DEFAULT_POLICY_MAX` | `1` | Maximum node count |
| `DMR_DEFAULT_POLICY_PREF` | `1` | Preferred node count |
| `DMR_DEFAULT_POLICY_STRIDE` | `2` | Multiplier used by `dmr_policy_round()` |
| `DMR_TALP_TARGET_CE` | `0.8` | Target communication efficiency for `dmr_policy_ce()` |
| `DMR_TALP_SENSITIVITY` | `15` | Adjustment sensitivity for `dmr_policy_ce()` |

:::tip
Environment variables override compiled defaults, so you can tune behaviour without recompiling.
:::

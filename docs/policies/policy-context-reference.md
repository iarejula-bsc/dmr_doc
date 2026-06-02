---
sidebar_position: 4
title: Policy Context Reference
---

`DMRPolicyContext` is passed to the `run` callback. All fields are **read-only**.

| Field | Type | Description |
|-------|------|-------------|
| `current_nodes` | `int` | Nodes in the current `MPI_COMM_WORLD` |
| `reconfig_count` | `int` | Number of reconfigurations since `dmr_init` |
| `min_nodes` | `int` | Policy minimum nodes |
| `max_nodes` | `int` | Policy maximum nodes |
| `nodes_in_expand` | `int` | Nodes requested in the next expand |
| `nodes_in_shrink` | `int` | Nodes released in the next shrink |
| `procs_in_expand` | `int` | Processes spawned in the next expand |
| `procs_in_shrink` | `int` | Processes exiting in the next shrink |
| `stride` | `int` | Legacy stride value; new policies should carry stride in their own state |
| `pref_nodes` | `int` | Preferred node count |
| `internal_dmr_state` | `void *` | Opaque pointer to `DMRState`; advanced use only |
| `internal_controller_state` | `void *` | Opaque pointer to `DMRControllerState`; advanced use only |

`reconfig_count` starts at `0` and increments by 1 after each successful reconfiguration.

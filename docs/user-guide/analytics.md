---
sidebar_position: 5
title: Analytics
---

DMR collects lightweight analytics at each reconfiguration and can print them at runtime.

## Enabling analytics

```bash
export DMR_PRINT_ANALYTICS=1
dmr mpirun -n 4 ./my_app
```

Or at compile time:

```bash
cmake -B build -DDMR_PRINT_ANALYTICS=1
```

## What is reported

At each reconfiguration DMR prints a summary line:

| Field | Description |
|-------|-------------|
| Nodes | Number of nodes in the new configuration |
| Processes | Number of MPI processes in the new configuration |
| Time since last reconfig | Wall-clock seconds since the previous reconfiguration |

Example output:

```
[DMR analytics] nodes=8 procs=8 time_since_last_reconfig=12.34s
```

## TALP-based analytics

When compiled with `DMR_USE_TALP=1`, the CE policy additionally reads TALP metrics — including communication efficiency — to make scaling decisions. These are collected via DLB's `CollectPOPMetrics` MPI collective inside the policy's `populate` callback.

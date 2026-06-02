---
sidebar_position: 5
title: Migration from Legacy API
---

The original API selected a policy via enum values passed to `dmr_check`. This API still works but produces **compiler deprecation warnings**.

## Migration table

| Old code | New equivalent |
|----------|----------------|
| `dmr_check(ROUND_POLICY)` | `dmr_set_policy(dmr_policy_round()); dmr_check(USE_POLICY);` |
| `dmr_check(CE_POLICY)` | `dmr_set_policy(dmr_policy_ce()); dmr_check(USE_POLICY);` |
| `dmr_check(LIST_POLICY)` | `dmr_set_policy(dmr_policy_list()); dmr_check(USE_POLICY);` |
| `dmr_check(SLURM4DMR_ROUND_POLICY)` | `dmr_set_policy(dmr_policy_round()); dmr_check(USE_POLICY);` |
| `dmr_check(SLURM4DMR_CE_POLICY)` | `dmr_set_policy(dmr_policy_ce()); dmr_check(USE_POLICY);` |
| `dmr_check(SLURM4DMR_QUEUE_POLICY)` | `dmr_set_policy(dmr_policy_round()); dmr_check(USE_POLICY);` |
| `dmr_set_policy_min_nodes(n)` | `DMR_DEFAULT_POLICY_MIN=n` env var |
| `dmr_set_policy_max_nodes(n)` | `DMR_DEFAULT_POLICY_MAX=n` env var |
| `dmr_set_policy_stride(n)` | `DMR_DEFAULT_POLICY_STRIDE=n` env var |
| `dmr_set_policy_pref_nodes(n)` | `DMR_DEFAULT_POLICY_PREF=n` env var |

## Before

```c
dmr_set_policy_min_nodes(2);
dmr_set_policy_max_nodes(16);
dmr_set_policy_stride(2);

while (should_keep_running()) {
    DMR_AUTO(dmr_check(ROUND_POLICY), redistribute(), redistribute(), cleanup());
}
```

## After

```c
// DMR_DEFAULT_POLICY_MIN=2 DMR_DEFAULT_POLICY_MAX=16 DMR_DEFAULT_POLICY_STRIDE=2

dmr_set_policy(dmr_policy_round());

while (should_keep_running()) {
    DMR_AUTO(dmr_check(USE_POLICY), redistribute(), redistribute(), cleanup());
}
```

## Silencing warnings temporarily

```bash
mpicc -Wno-deprecated-declarations -o my_app my_app.c -ldmr
```

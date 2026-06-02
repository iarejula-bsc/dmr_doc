---
sidebar_position: 1
title: dmr.h
---

```c
#include "dmr.h"
```

## Types

### DMRAction

Returned by `dmr_init`, `dmr_check`, and `dmr_finalize`.

| Value | Meaning |
|-------|---------|
| `DMR_NO_ACTION` | No reconfiguration occurred |
| `DMR_RECONF` | A reconfiguration happened |
| `DMR_EXIT` | This rank is being removed |
| `DMR_ERROR` | An error occurred |

### DMRSuggestion

Passed to `dmr_check`.

| Value | Meaning |
|-------|---------|
| `USE_POLICY` | Let the registered policy decide |
| `SHOULD_EXPAND` | Hint: try to expand |
| `SHOULD_SHRINK` | Hint: try to shrink |
| `SHOULD_STAY` | Hint: do not reconfigure this iteration |

## Functions

### dmr_init

```c
DMRAction dmr_init(int argc, char **argv);
```

Initializes DMR. Must be called after `MPI_Init`. **Collective.**

### dmr_check

```c
DMRAction dmr_check(DMRSuggestion suggestion);
```

Evaluates the active policy and performs a reconfiguration if warranted. Call inside your main loop. **Collective.**

### dmr_finalize

```c
DMRAction dmr_finalize(void);
```

Shuts down DMR. Must be called before `MPI_Finalize`. **Collective.**

### dmr_set_policy

```c
int dmr_set_policy(DMRPolicy *policy);
```

Registers a policy object. **Collective.** Must not be called while `dmr_check` is in progress.

## Macros

### DMR_AUTO

```c
DMR_AUTO(call, on_expand, on_shrink, on_exit)
```

Convenience wrapper — dispatches to the appropriate callback based on the `DMRAction` returned by `call`. See [The DMR_AUTO Macro](../user-guide/dmr-auto-macro) for details.

### DMR_DEBUG_LEVEL

Controls debug verbosity (`0` = off, `1` = rank 0, `2` = all ranks). Can be overridden at runtime via the environment variable of the same name.

### DMR_PRINT_ANALYTICS

Print analytics at each reconfiguration when set to `1`. Can be overridden at runtime.

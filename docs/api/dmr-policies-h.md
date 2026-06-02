---
sidebar_position: 2
title: dmr_policies.h
---

```c
#include "dmr_policies.h"
```

## Types

### DMRPolicyOp

```c
typedef enum { DMR_POLICY_STAY, DMR_POLICY_EXPAND, DMR_POLICY_SHRINK } DMRPolicyOp;
```

### DMRPolicySuggestion

```c
typedef struct {
    DMRPolicyOp operation;
    int         nodes;
    int         processes;
} DMRPolicySuggestion;
```

### DMRPolicyContext

Passed to `populate` and `run` callbacks. See [Policy Context Reference](../policies/policy-context-reference) for the full field list.

### DMRPolicy

```c
struct DMRPolicyStruct {
    char const          *name;
    size_t               state_size;
    void                *state;
    DMRPolicyPopulateFn  populate;
    DMRPolicyRunFn       run;
    DMRPolicySaveFn      save;
    DMRPolicyLoadFn      load;
    DMRPolicyDestroyFn   destroy;
};
```

## Built-in policy constructors

```c
DMRPolicy *dmr_policy_always_stay(void);
DMRPolicy *dmr_policy_list(void);
DMRPolicy *dmr_policy_round(void);
#if defined(COMPILED_WITH_TALP)
DMRPolicy *dmr_policy_ce(void);
#endif
```

## Decision helpers

```c
DMRPolicySuggestion dmr_policy_stay(void);
DMRPolicySuggestion dmr_policy_expand_fixed(int nodes, int processes);
DMRPolicySuggestion dmr_policy_shrink_fixed(int nodes, int processes);
DMRPolicySuggestion dmr_policy_expand_to(int target, int procs, DMRPolicyContext const *ctx);
DMRPolicySuggestion dmr_policy_shrink_to(int target, int procs, DMRPolicyContext const *ctx);
DMRPolicySuggestion dmr_policy_expand_to_max(DMRPolicyContext const *ctx);
DMRPolicySuggestion dmr_policy_shrink_to_min(DMRPolicyContext const *ctx);
```

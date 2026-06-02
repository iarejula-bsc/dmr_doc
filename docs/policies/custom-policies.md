---
sidebar_position: 3
title: Custom Policies
---

A policy is any `DMRPolicy` struct whose callbacks you implement.

## DMRPolicy struct

```c
struct DMRPolicyStruct {
    char const          *name;
    size_t               state_size;
    void                *state;
    DMRPolicyPopulateFn  populate;  // optional
    DMRPolicyRunFn       run;       // required
    DMRPolicySaveFn      save;      // optional
    DMRPolicyLoadFn      load;      // optional
    DMRPolicyDestroyFn   destroy;   // optional
};
```

## Minimal example

```c
typedef struct { int current_nodes; int max_nodes; } MyPolicyState;

static int my_populate(DMRPolicy *policy, DMRPolicyContext const *context)
{
    ((MyPolicyState *)policy->state)->current_nodes = context->current_nodes;
    return 0;
}

static DMRPolicySuggestion my_run(DMRPolicy *policy, DMRPolicyContext const *context)
{
    MyPolicyState *s = (MyPolicyState *)policy->state;
    if (s->current_nodes < s->max_nodes)
        return dmr_policy_expand_fixed(1, 0);
    return dmr_policy_stay();
}

typedef struct { DMRPolicy policy; MyPolicyState state; } MyPolicy;

static void create_my_policy(MyPolicy *p, int max_nodes)
{
    p->state = (MyPolicyState){ .max_nodes = max_nodes };
    p->policy = (DMRPolicy){
        .name       = "my_expand_to_max",
        .state_size = sizeof(MyPolicyState),
        .state      = &p->state,
        .populate   = my_populate,
        .run        = my_run,
    };
}
```

Then register it before the main loop:

```c
MyPolicy my_policy;
create_my_policy(&my_policy, 4);
dmr_set_policy(&my_policy.policy);  // collective
```

## Decision helpers

Use these inside `run` instead of building `DMRPolicySuggestion` manually:

```c
dmr_policy_stay()
dmr_policy_expand_fixed(nodes, procs)
dmr_policy_shrink_fixed(nodes, procs)
dmr_policy_expand_to(target, procs, ctx)
dmr_policy_shrink_to(target, procs, ctx)
dmr_policy_expand_to_max(ctx)
dmr_policy_shrink_to_min(ctx)
```

## Ownership rules

- DMR does **not** own the `DMRPolicy` pointer — keep it alive until after `dmr_finalize`.
- `destroy` is **not** called automatically; call it yourself if needed.
- `dmr_set_policy` is **collective** — all ranks must call it without intervening `dmr_check` calls.

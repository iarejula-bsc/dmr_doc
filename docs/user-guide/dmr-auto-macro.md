---
sidebar_position: 2
title: The DMR_AUTO Macro
---

`DMR_AUTO` is a convenience macro that wraps the three DMR lifecycle functions and automatically dispatches to the correct callback based on the outcome.

## Signature

```c
DMR_AUTO(call, on_expand, on_shrink, on_exit)
```

| Parameter | Description |
|-----------|-------------|
| `call` | One of `dmr_init(...)`, `dmr_check(...)`, or `dmr_finalize()` |
| `on_expand` | Expression evaluated when processes are **added** |
| `on_shrink` | Expression evaluated when processes are **removed** |
| `on_exit` | Expression evaluated when **this rank is being removed** |

## Dispatch table

| DMRAction | Macro behaviour |
|-----------|-----------------|
| `DMR_NO_ACTION` | No callback invoked |
| `DMR_RECONF` (expand) | Evaluates `on_expand` |
| `DMR_RECONF` (shrink) | Evaluates `on_shrink` |
| `DMR_EXIT` | Evaluates `on_exit`, then terminates the rank |
| Error | Prints an error and calls `MPI_Abort` |

## Examples

```c
// dmr_init — no callbacks needed at startup
DMR_AUTO(dmr_init(argc, argv), (void)NULL, (void)NULL, (void)NULL);

// dmr_check — full reconfiguration handling
DMR_AUTO(dmr_check(USE_POLICY),
         redistribute_data(),   // on_expand
         redistribute_data(),   // on_shrink
         cleanup());            // on_exit

// dmr_finalize — only exit callback matters
DMR_AUTO(dmr_finalize(), (void)NULL, (void)NULL, cleanup());
```

## Without the macro

If you prefer explicit control, handle the returned `DMRAction` yourself:

```c
DMRAction action = dmr_check(USE_POLICY);
if (action == DMR_RECONF) {
    redistribute_data();
} else if (action == DMR_EXIT) {
    cleanup();
    MPI_Finalize();
    exit(0);
}
```

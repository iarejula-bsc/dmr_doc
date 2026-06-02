---
sidebar_position: 7
title: Intercommunicator Mode
---

When DMR is compiled with `DMR_CHECKPOINT_RESTART=0`, reconfigurations use a direct MPI intercommunicator instead of checkpointing to disk.

During a reconfiguration, old and new processes are **alive at the same time**. DMR exposes `DMR_INTERCOMM`, an intercommunicator that connects both sets of processes so they can exchange data directly via MPI. Once the transfer is complete, the old processes exit.

New processes, like in checkpoint-restart mode, start from the beginning of the executable. Use `dmr_intercomm_available()` to check whether `DMR_INTERCOMM` is currently valid before using it.

:::note[Work in progress]
Detailed usage examples and API patterns for intercommunicator mode are coming soon.
:::

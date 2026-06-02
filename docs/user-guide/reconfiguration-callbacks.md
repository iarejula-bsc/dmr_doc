---
sidebar_position: 3
title: Reconfiguration Callbacks
---

Reconfiguration callbacks are functions your application provides to DMR so it can notify you when the process set changes.

## on_expand

Called on **all surviving ranks** after new processes have been added and `MPI_COMM_WORLD` has been updated to include them.

```c
void on_expand(void)
{
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    rebalance_work(rank, size);
}
```

Use it to: broadcast or scatter data to new ranks, recreate derived communicators, rebalance workload.

## on_shrink

Called on **all surviving ranks** after excess processes have exited and `MPI_COMM_WORLD` has been updated.

```c
void on_shrink(void)
{
    int rank, size;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    rebalance_work(rank, size);
}
```

## on_exit

Called on a **rank that is being removed**. After this callback returns, DMR terminates the rank.

```c
void on_exit(void)
{
    MPI_Send(my_data, my_data_size, MPI_DOUBLE, 0, TAG, MPI_COMM_WORLD);
    free(my_data);
}
```

:::caution
Do **not** call `MPI_Finalize` inside `on_exit`. DMR handles rank termination after the callback returns.
:::

## Ordering guarantees

- `on_exit` runs on leaving ranks **before** `on_shrink` runs on surviving ranks.
- When `on_shrink` runs, the leaving ranks have already exited `MPI_COMM_WORLD`.
- `MPI_COMM_WORLD` is valid and updated in both `on_expand` and `on_shrink`.

## Common pattern

Many applications use the same function for both expand and shrink:

```c
DMR_AUTO(dmr_check(USE_POLICY),
         redistribute(),
         redistribute(),
         send_data_and_cleanup());
```

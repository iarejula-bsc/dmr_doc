---
sidebar_position: 99
title: Common Issues
---

## Overlapping expands cause MPI launch failure

**Symptom:** consecutive expansions fail with an MPI spawn or PRRTE launch error.

**Cause:** if `dmr_check(SHOULD_EXPAND)` is called again before the previous expansion has fully settled, the two MPI spawn operations can interfere with each other.

**Fix:** add a short `sleep` before each `dmr_check` call to let the previous expand complete:

```c
sleep(2);
DMR_AUTO(dmr_check(SHOULD_EXPAND), save(), (void)NULL, cleanup());
```

---

## Did you launch with the DMR wrapper?

**Symptom:**
```
DMR Error: Could not detect DMR state. Did you launch with the DMR wrapper?
```

**Cause:** the application was launched with `mpirun` directly instead of through `dmr`.

**Fix:** always launch with the wrapper:
```bash
dmr mpirun --host $NODELIST_WITH_COUNTS ./my_app
```

---

## Issue fetching Slurm job ID info from environment

**Symptom:**
```
DMR Error: Issue fetching Slurm job ID info from environment.
```

**Cause:** the application was run outside of a Slurm job allocation (e.g. directly from the shell). DMR requires `SLURM_JOB_ID` to be set, which only happens inside a job.

**Fix:** submit via `sbatch` or run inside `salloc`.

---

## cgroup.conf parse errors in slurm output

**Symptom:**
```
slurmstepd: error: Parse error in file /etc/slurm/cgroup.conf line 1: "CgroupPlugin=cgroup/v1"
slurmstepd: fatal: Could not open/read/parse cgroup.conf file
```

**Cause:** known configuration noise in the MiniDMR Docker image. These errors come from Slurm's cgroup plugin, not from DMR.

**Fix:** safe to ignore. They do not affect DMR behaviour.

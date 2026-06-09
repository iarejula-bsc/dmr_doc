---
sidebar_position: 7
title: Modos de operación
---

DMR ofrece dos modos de operación, que se diferencian en cómo interactúan con el gestor de recursos.

## DMR@Jobs

DMR@Jobs se conecta a la **instancia de Slurm predeterminada de tu sistema**. Tu aplicación se ejecuta como un trabajo Slurm normal y DMR solicita altas o bajas de nodos a través de la API estándar de Slurm.

## Slurm4DMR

Slurm4DMR ejecuta una **instancia anidada de Slurm** dentro de una asignación fija de recursos gestionada por el gestor externo. Tu trabajo dispone de un conjunto fijo de nodos y Slurm4DMR los reasigna internamente a medida que la aplicación se expande o se reduce.

:::note
Slurm4DMR está pensado actualmente solo para ejecutarse en **MareNostrum 5**.
:::

:::info[Pendiente de documentar]
Cuándo conviene usar Slurm4DMR frente a DMR@Jobs todavía no está documentado del todo. Si necesitas orientación, escríbenos a [accelcom@bsc.es](mailto:accelcom@bsc.es).
:::

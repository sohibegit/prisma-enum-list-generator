# prisma-enum-list-generator

Generates `as const` value lists for every enum in your Prisma schema.

```prisma
generator enumLists {
  provider = "prisma-enum-list-generator"
}
```

By default, the generator writes `enum-lists.ts` into your Prisma Client output folder. Set
`output` only if you want a different file or folder.

For this Prisma enum:

```prisma
enum IdempotencyStatus {
  IN_PROGRESS
  COMPLETED
  FAILED
}
```

The generator writes:

```ts
import { IdempotencyStatus } from "./enums";

export const IdempotencyStatusList = [
  IdempotencyStatus.IN_PROGRESS,
  IdempotencyStatus.COMPLETED,
  IdempotencyStatus.FAILED,
] as const;
```

Use `importPath` if your Prisma enum exports come from somewhere else:

```prisma
generator enumLists {
  provider   = "prisma-enum-list-generator"
  importPath = "../prisma/client"
}
```

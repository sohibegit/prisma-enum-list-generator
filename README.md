# prisma-enum-list-generator

Generates `as const` value lists for every enum in your Prisma schema.

```prisma
generator enumLists {
  provider = "prisma-enum-list-generator"
  output   = "../src/generated/enum-lists.ts"
}
```

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
import { IdempotencyStatus } from "@prisma/client";

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
  output     = "../src/generated/enum-lists.ts"
  importPath = "../prisma/client"
}
```

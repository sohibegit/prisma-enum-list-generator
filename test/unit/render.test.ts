import assert from 'node:assert/strict';
import test from 'node:test';
import { renderEnumLists } from '../../src/render';

test('renders one list per enum', () => {
  assert.equal(
    renderEnumLists([
      {
        name: 'IdempotencyStatus',
        values: [
          { name: 'IN_PROGRESS', dbName: null },
          { name: 'COMPLETED', dbName: null },
          { name: 'FAILED', dbName: null }
        ]
      }
    ]),
    `import { IdempotencyStatus } from "@prisma/client";

export const IdempotencyStatusList = [
  IdempotencyStatus.IN_PROGRESS,
  IdempotencyStatus.COMPLETED,
  IdempotencyStatus.FAILED,
] as const;
`
  );
});

import assert from 'node:assert/strict';
import test from 'node:test';
import type { GeneratorOptions } from '@prisma/generator';
import { getOutputPath } from '../../src/on-generate';

test('defaults output to the Prisma Client output folder', () => {
  assert.equal(
    getOutputPath({
      generator: { output: null },
      otherGenerators: [
        {
          provider: { fromEnvVar: null, value: 'prisma-client' },
          output: { fromEnvVar: null, value: '/tmp/client' }
        }
      ]
    } as GeneratorOptions),
    '/tmp/client/enum-lists.ts'
  );
});

test('honors explicit generator output', () => {
  assert.equal(
    getOutputPath({
      generator: { isCustomOutput: true, output: { fromEnvVar: null, value: '/tmp/lists.ts' } },
      otherGenerators: []
    } as GeneratorOptions),
    '/tmp/lists.ts'
  );
});

test('ignores manifest default output', () => {
  assert.equal(
    getOutputPath({
      generator: { output: { fromEnvVar: null, value: '/tmp/schema/enum-lists.ts' } },
      otherGenerators: [
        {
          provider: { fromEnvVar: null, value: 'prisma-client' },
          output: { fromEnvVar: null, value: '/tmp/client' }
        }
      ]
    } as GeneratorOptions),
    '/tmp/client/enum-lists.ts'
  );
});

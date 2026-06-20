import type { GeneratorManifest } from '@prisma/generator';

/** Generates simple metadata for this generator. */
export function onManifest(): GeneratorManifest {
  let version: string | undefined;

  try {
    const pkg = require('../package.json');
    version = pkg.version;
  } catch {}

  return {
    version,
    defaultOutput: './enum-lists.ts',
    prettyName: 'Prisma Enum List Generator'
  };
}

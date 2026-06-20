import fs from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import type { GeneratorConfig, GeneratorOptions } from '@prisma/generator';
import { renderEnumLists } from './render';

/** Runs the generator with the given options. */
export async function onGenerate(options: GeneratorOptions) {
  try {
    const outputPath = getOutputPath(options);
    const importPath = String(options.generator.config.importPath ?? '@prisma/client');
    const content = renderEnumLists(options.dmmf.datamodel.enums, importPath);

    await fs.mkdir(dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, content);
    // Ensures we don't crash the generator process
  } catch (error) {
    console.error(error);
  }
}

export function getOutputPath(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (output && options.generator.isCustomOutput) {
    return extname(output) ? output : join(output, 'enum-lists.ts');
  }

  const client = options.otherGenerators.find(isPrismaClientGenerator);
  const clientOutput = client?.output?.value;

  if (!clientOutput) {
    throw new Error('Could not find Prisma Client output for enum-lists.ts');
  }

  return join(clientOutput, 'enum-lists.ts');
}

function isPrismaClientGenerator(generator: GeneratorConfig) {
  const provider = generator.provider.fromEnvVar ?? generator.provider.value;

  return provider === 'prisma-client' || provider === 'prisma-client-js';
}

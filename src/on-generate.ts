import fs from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import type { GeneratorOptions } from '@prisma/generator';
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

function getOutputPath(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (!output) {
    return join(dirname(options.schemaPath), 'enum-lists.ts');
  }

  return extname(output) ? output : join(output, 'enum-lists.ts');
}

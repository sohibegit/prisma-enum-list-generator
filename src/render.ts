import type { DatamodelEnum } from '@prisma/dmmf';

export function renderEnumLists(enums: readonly DatamodelEnum[], importPath = '@prisma/client') {
  if (enums.length === 0) {
    return '';
  }

  return `${renderImport(enums, importPath)}\n\n${enums.map(renderEnumList).join('\n\n')}\n`;
}

function renderImport(enums: readonly DatamodelEnum[], importPath: string) {
  return `import { ${enums.map((item) => item.name).join(', ')} } from ${JSON.stringify(importPath)};`;
}

function renderEnumList(item: DatamodelEnum) {
  const values = item.values.map((value) => `  ${item.name}.${value.name},`).join('\n');

  return `export const ${item.name}List = [\n${values}\n] as const;`;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEnumLists = renderEnumLists;
function renderEnumLists(enums, importPath = './enums') {
    if (enums.length === 0) {
        return '';
    }
    return `${renderImport(enums, importPath)}\n\n${enums.map(renderEnumList).join('\n\n')}\n`;
}
function renderImport(enums, importPath) {
    return `import { ${enums.map((item) => item.name).join(', ')} } from ${JSON.stringify(importPath)};`;
}
function renderEnumList(item) {
    const values = item.values.map((value) => `  ${item.name}.${value.name},`).join('\n');
    return `export const ${item.name}List = [\n${values}\n] as const;`;
}
//# sourceMappingURL=render.js.map
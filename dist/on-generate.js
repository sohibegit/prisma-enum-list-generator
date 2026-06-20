"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onGenerate = onGenerate;
exports.getOutputPath = getOutputPath;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("node:fs/promises"));
const node_path_1 = require("node:path");
const render_1 = require("./render");
/** Runs the generator with the given options. */
async function onGenerate(options) {
    try {
        const outputPath = getOutputPath(options);
        const importPath = String(options.generator.config.importPath ?? './enums');
        const content = (0, render_1.renderEnumLists)(options.dmmf.datamodel.enums, importPath);
        await promises_1.default.mkdir((0, node_path_1.dirname)(outputPath), { recursive: true });
        await promises_1.default.writeFile(outputPath, content);
        // Ensures we don't crash the generator process
    }
    catch (error) {
        console.error(error);
    }
}
function getOutputPath(options) {
    const output = options.generator.output?.value;
    if (output && options.generator.isCustomOutput) {
        return (0, node_path_1.extname)(output) ? output : (0, node_path_1.join)(output, 'enum-lists.ts');
    }
    const client = options.otherGenerators.find(isPrismaClientGenerator);
    const clientOutput = client?.output?.value;
    if (!clientOutput) {
        throw new Error('Could not find Prisma Client output for enum-lists.ts');
    }
    return (0, node_path_1.join)(clientOutput, 'enum-lists.ts');
}
function isPrismaClientGenerator(generator) {
    const provider = generator.provider.fromEnvVar ?? generator.provider.value;
    return provider === 'prisma-client' || provider === 'prisma-client-js';
}
//# sourceMappingURL=on-generate.js.map
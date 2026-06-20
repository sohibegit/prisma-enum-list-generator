"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onManifest = onManifest;
/** Generates simple metadata for this generator. */
function onManifest() {
    let version;
    try {
        const pkg = require('../package.json');
        version = pkg.version;
    }
    catch { }
    return {
        version,
        defaultOutput: './enum-lists.ts',
        prettyName: 'Prisma Enum List Generator'
    };
}
//# sourceMappingURL=on-manifest.js.map
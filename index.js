const fs = require('fs');
const path = require('path');

function findImportsAndAppend(content, currentDir, importedFiles) {
    const regex = /^import ["'](.*?)["'];/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const importPath = match[1];

        // Resolve the path to the file to import
        const fullPath = importPath.startsWith('@')
            ? path.join(process.cwd(), 'node_modules', importPath)
            : path.join(currentDir, importPath);

        // Avoid re-importing files
        if (!importedFiles.includes(fullPath)) {
            importedFiles.push(fullPath);
            const fileContent = fs.readFileSync(fullPath, 'utf8');

            // Remove SPDX and 'pragma solidity' lines
            let fileContentCleaned = fileContent.replace(/\/\/ SPDX-License-Identifier: .*\n/, '');
            fileContentCleaned = fileContentCleaned.replace(/pragma solidity .*\n/, '');

            content = content.replace(match[0], `// inlined from: ${importPath}\n${findImportsAndAppend(fileContentCleaned, path.dirname(fullPath), importedFiles)}\n`);
        } else {
            content = content.replace(match[0], '');
        }
    }
    return content;
}

function inlineImports(contractSource, cwd) {
    let importedFiles = [];
    const inlined = findImportsAndAppend(contractSource, cwd || process.cwd(), importedFiles);
    return inlined;
}

module.exports = inlineImports;
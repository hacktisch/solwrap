# Solwrap

![npm](https://img.shields.io/npm/v/solwrap)
![license](https://img.shields.io/npm/l/solwrap)

Flatten your contract code into one file by inlining all imports recursively.

This library is handy when you need to verify your Solidity contract code on platforms that require flat files, like Etherscan. Or when you need to compile in your production app without access to node_modules.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Solwrap.

```bash
npm install solwrap
```

This library has not install any dependencies and any library referenced in your contract (e.g. `@openzeppelin/contracts`) must be installed separately.

## Usage

```js
const solwrap = require('solwrap');

// specify the path to your solidity file
const contractSource = fs.readFileSync('./path/to/your/Contract.sol', 'utf8');

const flattenedCode=solwrap(contractSource);
```
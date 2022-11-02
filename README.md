# Compiler Programing Language

@compiler-server/compiler is a Node.js library for dealing with compiler programing language.
OS only Linux (Ubuntu)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install @compiler-server/compiler.

```bash
npm install @compiler-server/compiler
```

Or [yarn](https://yarnpkg.com/)

```bash
yarn add @compiler-server/compiler
```

## Usage

```js
import { Compiler } from "@compiler-server/compiler"

const compiler = new Compiler();
compiler.compile({language: compiler.languages.Node, code: `console.log("Hello")`})
```

## Compile Language List

- Node Js
- C++
- C

## License
[MIT](https://choosealicense.com/licenses/mit/)

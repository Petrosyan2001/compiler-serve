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
//Node Js
(async () =>{
    const result = await compiler.compile({
        language: Language.Node,
        code: `function filterArgs(arg){return arg}; 
        `,
        afterRunTest: `
        const test = require('node:test');
        const assert = require('assert/strict');

        test('check args', () => {
            return assert.equal(filterArgs(1), 1);
        });`,
        similarWorkingJobCount: 11
    })
})()
//Java
(async () =>{
    const result = await compiler.compile({
        language: Language.Java,
        code: `
        class Main{
            public static void main(String[] args) {
                System.out.println("main");
            }
      
            public static String hello() {
              return "hello";
            }
      }
        `,
        afterRunTest: `
            public class MainTest extends Base {

            @Before public void beforeEach() {
                run();
            }
        
            @Test public void testOne(){
                assertEquals("hello", Main.hello());
            }
        }
        `,
        similarWorkingJobCount: 11
    })
})()
```

## Compile Language List

- Node Js
- C++
- C
- Java

## License
[MIT](https://choosealicense.com/licenses/mit/)

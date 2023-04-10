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

Add Dependency

```bash
sudo apt --yes --force-yes install wget

# Install Task Spoller
sudo apt-get --yes --force-yes install -y task-spooler

#Install C++ And C
sudo apt-get --yes --force-yes install build-essential manpages-dev


#Install Java
sudo apt --yes --force-yes install default-jdk

#Install Maven
sudo apt --yes --force-yes install maven
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
//C++
(async () =>{
    const result = await compiler.compile({
        language: Language['C++'],
        code: `
         int numbers() {
           return 1;
         }
        `,
        afterRunTest: `
            TEST(numbers_equal) {
             int spam = numbers();
             ASSERT_EQUAL(spam, 2);
          }
        `,
        similarWorkingJobCount: 11
    })
})()
//C
(async () =>{
    const result = await compiler.compile({
        language: Language.C,
        code: `
        int my_sum(int a, int b) {
        return a + b;
        }
        `,
        afterRunTest: `
        assert(3 == my_sum(1, 1));
        assert(2 == my_sum(1, 1));
        `,
        similarWorkingJobCount: 11
    })
})()
//C#
(async () =>{
    const result = await compiler.compile({
        language: Language['C#'],
        code: `
        public int Show()
        {  
           return 1;
        }  

        public int Run()
         {
            Program program = new Program();
            return program.Show();    
         }
        `,
        afterRunTest: `
        static void Main()  
        {  
           Program program = new Program();
           Console.WriteLine("T E S T S");
           Debug.Assert(program.Run() == 2, " Value should not be 2.");
           Console.ReadLine();
        }  `,
        similarWorkingJobCount: 11
    })
})()
```

## Compile Language List

- Node Js
- C++
- C
- Java
- C#
## License
[MIT](https://choosealicense.com/licenses/mit/)

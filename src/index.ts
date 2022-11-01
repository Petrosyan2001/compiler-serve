import Compiler from "./modules/main"

const compiler = new Compiler();

compiler.compile({language: compiler.languages.Node, code: 'console.log("Hello")'})


export default Compiler
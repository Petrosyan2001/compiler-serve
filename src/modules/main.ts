import __construct from "./construct";
import { Language } from "../enums/language";
import { Languages } from "./language";
import { ICompileArg, ICompileResult, IError } from "../interfaces/main.interface"
class Compiler {
  public languages = Language;
  constructor() {
    __construct();
  }

  public async compile({
    language,
    code,
    input,
    timeout
  }:ICompileArg):Promise<ICompileResult> {
    try {
      const response = await Languages[language].Run(code, input || '', timeout || 0);
      return {
        data: response.stdout || response.stderr,
      };
    } catch (e: unknown) {
      return {
        error: (e as IError)?.message || 'error'
      };
    }
  }
}

export default Compiler;

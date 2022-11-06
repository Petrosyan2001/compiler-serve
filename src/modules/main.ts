import __construct from "./construct";
import { Language } from "../enums/language";
import { Languages } from "./language";
import { ICompileArg, ICompileResult, IError } from "../interfaces/main.interface"
class Compiler {
  public languages = Language;
  constructor() {
    __construct();
  }

  public compile({
    language,
    code,
    input,
    timeout
  }:ICompileArg):ICompileResult {
    try {
      const response = Languages[language].Run(code, input || '', timeout || 0);
      if (response.stderr) {
        throw new Error(response.stderr);
      }
      return {
        data: response.stdout,
      };
    } catch (e: unknown) {
      return {
        error: (e as IError)?.message || 'error'
      };
    }
  }
}

export default Compiler;

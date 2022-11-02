import __construct from "./construct";
import { Language } from "../enums/language";
import { Languages } from "./language";
class Compiler {
  public languages = Language;
  constructor() {
    __construct();
  }

  public compile({
    language,
    code,
    input
  }: {
    language: Language;
    code: string;
    input?: string
  }): {
    status: number,
    data: string
  } {
    try {
      const response = Languages[language].Run(code, input || '');
      if (response.stderr) {
        throw new Error(response.stderr);
      }
      return {
        status: 200,
        data: response.stdout
      };
    } catch (e) {
      return {
        status: 400,
        data: e.message
      };
    }
  }
}

export default Compiler;

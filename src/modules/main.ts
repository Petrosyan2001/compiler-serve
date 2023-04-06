import __construct from "./construct";
import { Language } from "../enums/language";
import { Languages } from "./language";
import {
  ICompileArg,
  ICompileResult,
  IError,
} from "../interfaces/main.interface";
import { exec } from "shelljs";
class Compiler {
  public languages = Language;
  constructor() {
    __construct();
  }

  public async compile({
    language,
    code,
    input,
    timeout,
    similarWorkingJobCount,
    afterRunTest
  }: ICompileArg): Promise<ICompileResult> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const { id, start_date } = await Languages[language].Run({
        code,
        input: input || "",
        timeout,
        similarWorkingJobCount: similarWorkingJobCount || 1,
        afterRunTest
      });
      const options: {
        timeout?: number;
      } = {};
      if (timeout) {
        options.timeout = timeout;
      }
      const proccess = exec(`tsp -c ${id}`, options);
      if (!proccess?.stderr && proccess.stdout) {
        proccess.exec(`tsp -k ${id}`, options);
        return {
          data: proccess.stdout,
          start_date,
        };
      }
      if (
        proccess?.stderr &&
        proccess?.code === 255 &&
        proccess?.stderr?.includes("Error in the request: Job")
      ) {
         return {
          warning: 'Please try again',
        }
      }
      return {
        data: proccess.stdout || "",
        start_date,
      };
    } catch (e: unknown) {
      return {
        error: (e as IError)?.message || "Inital Server Error",
      };
    }
  }
  public getLanguages(){
    return [
      {
        key: 'javascript',
        value: this.languages.Node,
        label: '(Node Js) Javascript',
        ext: 'js'
      },
      {
        key: 'csharp',
        value: this.languages["C#"],
        label: 'C#',
        ext: 'cs'
      },
      {
        key: 'python',
        value: this.languages.Python,
        label: 'Python',
        ext: 'py'
      },
      {
        key: 'php',
        value: this.languages.Php,
        label: 'Php',
        ext: 'php'
      },
      {
        key: 'cpp',
        value: this.languages['C++'],
        label: this.languages['C++'],
        ext: 'cpp'
      },
      {
        key: 'c',
        value: this.languages.C,
        label: this.languages.C,
        ext: 'c'
      },
      {
        key: 'java',
        value: this.languages.Java,
        label: this.languages.Java,
        ext: 'java'
      },
    ]
  }
}

export default Compiler;

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
  }: ICompileArg): Promise<ICompileResult> {
    try {
      const { id, start_date } = await Languages[language].Run({
        code,
        input: input || "",
        timeout,
        similarWorkingJobCount: similarWorkingJobCount || 1,
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
        ext: 'js',
        input: false,
      },
      {
        key: 'cpp',
        value: this.languages['C++'],
        label: this.languages['C++'],
        ext: 'cpp',
        input: true,
      },
      {
        key: 'c',
        value: this.languages.C,
        label: this.languages.C,
        ext: 'c',
        input: true,
      },
      {
        key: 'java',
        value: this.languages.Java,
        label: this.languages.Java,
        ext: 'java',
        input: true,
      },
    ]
  }
}

export default Compiler;

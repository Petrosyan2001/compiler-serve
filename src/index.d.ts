import { Language } from "./enums/language";
export declare class Compiler {
    public languages: Language
    constructor();

   public compile({language, code, input}: {language: Language, code: string, input?: string}):{
    status: number,
    data: string
   }
}
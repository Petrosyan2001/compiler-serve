import { Language } from "./enums/language";
export declare class Compiler {
    public language: Language
    constructor();

   public compile({language, code}: {language: Language, code: string}):{
    status: number,
    data: string
   }
}
import { Language } from "../enums/language";
export interface ICompileArg {
    language: Language;
    code: string;
    input?: string
}
export interface ICompileResult {
    data?: string,
    error?: string
}

export interface IError {
    message: string
}
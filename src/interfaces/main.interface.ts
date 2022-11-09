import { Language } from "../enums/language";
export interface ICompileArg {
    //language
    language: Language;
    //code 
    code: string;
    //input language
    input?: string;
    //wait timeout
    timeout?: number,
    //get/set the number of max simultaneous jobs of the server.
    similarWorkingJobCount?: number
}
export interface ICompileResult {
    data?: string,
    error?: string,
    start_date?: number,
    warning?: string
}

export interface IError {
    message: string
}
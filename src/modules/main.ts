import __construct from "./construct";
import { Language } from "../enums/language";
import { Languages } from "./language"
class Compiler {
    public languages = Language;
    constructor(){
        __construct()
    }

    public compile({language, code}: {language: Language, code: string}){
       return Languages[language].Run(code)
    }
}

export default Compiler
import { Language } from "../enums/language";
declare class Compiler {
    languages: typeof Language;
    constructor();
    compile({ language, code, }: {
        language: Language;
        code: string;
    }): {
        status: number;
        data: string;
    };
}
export default Compiler;
//# sourceMappingURL=main.d.ts.map
import { Language } from "../enums/language";
declare class Compiler {
    languages: typeof Language;
    constructor();
    compile({ language, code, input }: {
        language: Language;
        code: string;
        input?: string;
    }): {
        status: number;
        data: string;
    };
}
export default Compiler;
//# sourceMappingURL=main.d.ts.map
import { Language } from "../enums/language";
declare class Compiler {
    languages: typeof Language;
    constructor();
    compile({ language }: {
        language: Language;
    }): void;
}
export default Compiler;
//# sourceMappingURL=main.d.ts.map
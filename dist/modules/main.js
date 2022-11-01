"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const construct_1 = __importDefault(require("./construct"));
const language_1 = require("../enums/language");
const language_2 = require("./language");
class Compiler {
    constructor() {
        this.languages = language_1.Language;
        (0, construct_1.default)();
    }
    compile({ language, code, }) {
        try {
            const response = language_2.Languages[language].Run(code);
            if (response.stderr) {
                throw new Error(response.stderr);
            }
            return {
                status: 200,
                data: response.stdout
            };
        }
        catch (e) {
            return {
                status: 400,
                data: e.message
            };
        }
    }
}
exports.default = Compiler;

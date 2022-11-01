"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const construct_1 = __importDefault(require("./construct"));
const language_1 = require("../enums/language");
class Compiler {
    constructor() {
        this.languages = language_1.Language;
        (0, construct_1.default)();
    }
    compile({ language }) {
        console.log(language);
    }
}
exports.default = Compiler;

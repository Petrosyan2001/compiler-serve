"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./modules/main"));
const compiler = new main_1.default();
console.log(compiler.compile({ language: compiler.languages.Node }));
exports.default = main_1.default;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importStar(require("shelljs"));
const comands_1 = require("../enums/comands");
const package_1 = require("../enums/package");
const message_1 = require("../enums/message");
const language_1 = require("../modules/language");
shelljs_1.default.config.silent = true;
const construct = () => {
    if (!(0, shelljs_1.which)(package_1.Package.Ts)) {
        (0, shelljs_1.exec)(comands_1.Comands.Ts);
    }
    if (!(0, shelljs_1.which)(package_1.Package.Ts)) {
        (0, shelljs_1.echo)(message_1.Message.Ts);
    }
    for (const lang in language_1.Languages) {
        language_1.Languages[lang].Install();
    }
};
exports.default = construct;

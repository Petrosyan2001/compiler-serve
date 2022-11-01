"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = void 0;
const language_1 = require("../../enums/language");
const Node_1 = require("./Node");
exports.Languages = {
    [language_1.Language.Node]: { Run: Node_1.Run, Install: Node_1.Install }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = void 0;
const language_1 = require("../../enums/language");
const Node_1 = require("./Node");
const C__1 = require("./C++");
const C_1 = require("./C");
exports.Languages = {
    [language_1.Language.Node]: { Run: Node_1.Run, Install: Node_1.Install },
    [language_1.Language['C++']]: { Run: C__1.Run, Install: C__1.Install },
    [language_1.Language.C]: { Run: C_1.Run, Install: C_1.Install }
};

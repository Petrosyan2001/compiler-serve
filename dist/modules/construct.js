"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
const comands_1 = require("../enums/comands");
const package_1 = require("../enums/package");
const message_1 = require("../enums/message");
const language_1 = require("../modules/language");
const construct = () => {
    if (!(0, shelljs_1.which)(package_1.Package.Make)) {
        (0, shelljs_1.exec)(comands_1.Comands.Make);
    }
    if (!(0, shelljs_1.which)(package_1.Package.Make)) {
        (0, shelljs_1.echo)(message_1.Message.Make);
    }
    if (!(0, shelljs_1.which)(package_1.Package.Ts)) {
        (0, shelljs_1.cd)('./debain/ts-1.0.2');
        (0, shelljs_1.exec)(comands_1.Comands.Ts);
        (0, shelljs_1.cd)('../../');
    }
    if (!(0, shelljs_1.which)(package_1.Package.Ts)) {
        (0, shelljs_1.echo)(message_1.Message.Ts);
    }
    for (const lang in language_1.Languages) {
        language_1.Languages[lang].Install();
    }
};
exports.default = construct;

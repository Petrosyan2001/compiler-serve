"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
const comands_1 = require("../enums/comands");
const package_1 = require("../enums/package");
const message_1 = require("../enums/message");
const construct = () => {
    if (!(0, shelljs_1.which)(package_1.Package.Make)) {
        (0, shelljs_1.exec)(comands_1.Comands.Make);
    }
    if (!(0, shelljs_1.which)(package_1.Package.Make)) {
        (0, shelljs_1.echo)(message_1.Message.Make);
        (0, shelljs_1.exit)();
    }
    if (!(0, shelljs_1.which)(package_1.Package.Ts)) {
        (0, shelljs_1.cd)('./debain/ts-1.0.2');
        (0, shelljs_1.exec)(comands_1.Comands.Ts);
        (0, shelljs_1.cd)('../../');
    }
    if (!(0, shelljs_1.which)(package_1.Package.Ts)) {
        (0, shelljs_1.echo)(message_1.Message.Ts);
        (0, shelljs_1.exit)();
    }
    (0, shelljs_1.exit)();
};
exports.default = construct;

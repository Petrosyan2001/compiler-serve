"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Install = exports.Run = void 0;
const shelljs_1 = require("shelljs");
const comands_1 = require("../../../enums/comands");
const message_1 = require("../../../enums/message");
const Run = (code) => {
    (0, shelljs_1.exec)(`ts | echo ${JSON.stringify(code)} > /${comands_1.Comands.Dir}/main.js`);
    const id = (0, shelljs_1.exec)(`ts node /${comands_1.Comands.Dir}/main.js`).stdout;
    const execute = (0, shelljs_1.exec)(`ts -c ${id}`);
    (0, shelljs_1.exec)(comands_1.Comands.KillFinished);
    return {
        stdout: execute.stdout,
        stderr: execute.stderr
    };
};
exports.Run = Run;
const Install = () => {
    if (!(0, shelljs_1.which)(comands_1.Comands.Node)) {
        (0, shelljs_1.echo)(message_1.Message.Node);
    }
    (0, shelljs_1.exec)(`ts mkdir -p /${comands_1.Comands.Dir}/${comands_1.Comands.Node}/`);
    (0, shelljs_1.exec)(`ts touch /${comands_1.Comands.Dir}/${comands_1.Comands.Node}/main.js`);
    (0, shelljs_1.exec)(comands_1.Comands.KillTs);
};
exports.Install = Install;

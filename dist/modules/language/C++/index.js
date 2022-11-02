"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Install = exports.Run = void 0;
const shelljs_1 = require("shelljs");
const comands_1 = require("../../../enums/comands");
const message_1 = require("../../../enums/message");
const Run = (code, input) => {
    (0, shelljs_1.cd)(comands_1.Comands["DirC++"]);
    (0, shelljs_1.exec)(`ts | echo ${JSON.stringify(code)} > ./main.cpp && echo ${JSON.stringify(input)} > ./input.txt`);
    const id = (0, shelljs_1.exec)(`ts g++ ./main.cpp`).stdout;
    (0, shelljs_1.exec)(`ts -c ${id}`);
    if (input) {
        const id_input = (0, shelljs_1.exec)("ts |  ./a.out  < input.txt > output.txt");
        (0, shelljs_1.exec)(`ts -c ${id_input}`);
        const id_output = (0, shelljs_1.exec)("ts cat output.txt");
        const execute = (0, shelljs_1.exec)(`ts -c ${id_output}`);
        (0, shelljs_1.exec)(`ts rm -rf /${comands_1.Comands.Dir}/${comands_1.Comands["DirC++"]}/*`);
        (0, shelljs_1.exec)(comands_1.Comands.KillFinished);
        (0, shelljs_1.cd)("..");
        return {
            stdout: execute.stdout,
            stderr: execute.stderr,
        };
    }
    else {
        const id_empty = (0, shelljs_1.exec)("ts  ./a.out");
        const execute = (0, shelljs_1.exec)(`ts -c ${id_empty}`);
        (0, shelljs_1.exec)(`ts rm -rf /${comands_1.Comands.Dir}/${comands_1.Comands["DirC++"]}/*`);
        (0, shelljs_1.exec)(comands_1.Comands.KillFinished);
        (0, shelljs_1.cd)("..");
        return {
            stdout: execute.stdout,
            stderr: execute.stderr,
        };
    }
};
exports.Run = Run;
const Install = () => {
    if (!(0, shelljs_1.which)(comands_1.Comands["C++"])) {
        (0, shelljs_1.exec)(comands_1.Comands["C++Install"]);
    }
    if (!(0, shelljs_1.which)(comands_1.Comands["C++"])) {
        (0, shelljs_1.echo)(message_1.Message["C++"]);
    }
    (0, shelljs_1.cd)(`/${comands_1.Comands.Dir}`);
    (0, shelljs_1.exec)(`ts mkdir -p ${comands_1.Comands["DirC++"]}/`);
    (0, shelljs_1.exec)(`ts touch ${comands_1.Comands["DirC++"]}/main.cpp`);
    (0, shelljs_1.exec)(comands_1.Comands.KillTs);
};
exports.Install = Install;

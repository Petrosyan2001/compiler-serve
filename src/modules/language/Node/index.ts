import { which,echo, exec } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";

const Run = (code: string):{
    stdout: string,
    stderr: string
} =>{
    exec(`ts | echo ${JSON.stringify(code)} > /${Comands.Dir}/main.js`);
    const id = exec(`ts node /${Comands.Dir}/main.js`).stdout;
    const execute = exec(`ts -c ${id}`);
    exec(Comands.KillFinished);
    return {
        stdout: execute.stdout,
        stderr: execute.stderr
    }
}

const Install = ():void =>{
    if (!which(Comands.Node)){
      echo(Message.Node)
    }
    exec(`ts mkdir -p /${Comands.Dir}/${Comands.Node}/`)
    exec(`ts touch /${Comands.Dir}/${Comands.Node}/main.js`)
    exec(Comands.KillTs)
}

export { Run, Install }
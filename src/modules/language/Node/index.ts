import { which,echo, exec, cd } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";

const Run = (code: string):{
    stdout: string,
    stderr: string
} =>{
    exec(`ts | echo ${JSON.stringify(code)} > ${Comands.Node}/main.js`);
    const id = exec(`ts node ${Comands.Node}/main.js`).stdout;
    const execute = exec(`ts -c ${id}`);
    exec(`ts rm -rf /${Comands.Dir}/${Comands.Node}/*`)
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
    cd(`/${Comands.Dir}`)
    exec(`ts mkdir -p ${Comands.Node}/`)
    exec(`ts touch ${Comands.Node}/main.js`)
    exec(Comands.KillTs)
}

export { Run, Install }
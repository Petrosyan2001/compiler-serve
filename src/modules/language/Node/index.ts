import { which,echo, exec, cd } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";

const Run = (code: string, _:string, timeout: number):{
    stdout: string,
    stderr: string
} =>{
    exec(`tsp | echo ${JSON.stringify(code)} > ${Comands.Node}/main.js`);
    const id = exec(`tsp node ${Comands.Node}/main.js`).stdout;
    const options:{
        timeout?: number 
    } = {}
    if (timeout){
     options.timeout = timeout
    }
    const execute = exec(`tsp -c ${id}`,options);
    exec(`tsp -k ${id}`);
    exec(`tsp rm -rf /${Comands.Dir}/${Comands.Node}/*`)
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
    exec(`tsp mkdir -p ${Comands.Node}/`)
    exec(`tsp touch ${Comands.Node}/main.js`)
    exec(Comands.KillTs)
}

export { Run, Install }
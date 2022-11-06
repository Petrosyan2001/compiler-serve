import { which, echo, exec, cd } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";

const Run = (
  code: string,
  input: string,
  timeout: number
): {
  stdout: string;
  stderr: string;
} => {
  exec(`tsp touch ${Comands.DirC}/main.c`);
  cd(Comands.DirC);
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }
  exec(
    `tsp | echo ${JSON.stringify(code)} > ./main.c && echo ${JSON.stringify(
      input
    )} > ./input.txt`
  );
  const id = exec(`tsp gcc ./main.c`,options).stdout;
  exec(`tsp -c ${id}`,options);
  exec(`tsp -k ${id}`);
  if (input) {
    const id_input = exec("tsp |  ./a.out  < input.txt > output.txt",options);
    exec(`tsp -c ${id_input}`,options);
    exec(`tsp -k ${id_input}`);
    const id_output = exec("tsp cat output.txt",options);
    const execute = exec(`tsp -c ${id_output}`);
    exec(`tsp -k ${id_output}`);
    exec(`tsp rm -rf /${Comands.Dir}/${Comands.DirC}/*`)
    exec(Comands.KillFinished);
    cd("..");
    return {
      stdout: execute.stdout,
      stderr: execute.stderr,
    };
  } else {
    const id_empty = exec("tsp  ./a.out",options);
    const execute = exec(`tsp -c ${id_empty}`,options);
    exec(`tsp -k ${id_empty}`);
    exec(`tsp rm -rf /${Comands.Dir}/${Comands.DirC}/*`)
    exec(Comands.KillFinished);
    cd("..");
    return {
      stdout: execute.stdout,
      stderr: execute.stderr,
    };
  }
};

const Install = (): void => {
  if (!which(Comands.C)) {
    echo(Message.C);
  }
  cd(`/${Comands.Dir}`);
  exec(`tsp mkdir -p ${Comands.DirC}/`);
  exec(Comands.KillTs);
};

export { Run, Install };

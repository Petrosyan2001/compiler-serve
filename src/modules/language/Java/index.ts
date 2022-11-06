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
  cd(Comands.JavaDir);
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }
  exec(
    `tsp | echo ${JSON.stringify(code)} > ./main.java && echo ${JSON.stringify(
      input
    )} > ./input.txt`
  );
  const id = exec(`tsp javac ./main.java`,options).stdout;
  exec(`tsp -c ${id}`,options);
  exec(`tsp -k ${id}`);
  if (input) {
    const id_input = exec("tsp |  java Main  < input.txt > output.txt", options);
    exec(`tsp -c ${id_input}`,options);
    exec(`tsp -k ${id_input}`);
    const id_output = exec("tsp cat output.txt",options);
    const execute = exec(`tsp -c ${id_output}`,options);
    exec(`tsp -k ${id_output}`);
    exec(`tsp rm -rf /${Comands.Dir}/${Comands.JavaDir}/*`);
    exec(Comands.KillFinished);
    cd("..");
    return {
      stdout: execute.stdout,
      stderr: execute.stderr,
    };
  } else {
    const id_empty = exec("tsp java Main",options);
    const execute = exec(`tsp -c ${id_empty}`, options);
    exec(`tsp -k ${id_empty}`);
    exec(`tsp rm -rf /${Comands.Dir}/${Comands.JavaDir}/*`);
    exec(Comands.KillFinished);
    cd("..");
    return {
      stdout: execute.stdout,
      stderr: execute.stderr,
    };
  }
};

const Install = (): void => {
  if (!which(Comands.Java)) {
    exec(Comands.JavaInstall);
  }
  if (!which(Comands.Java)) {
    echo(Message.Java);
  }
  cd(`/${Comands.Dir}`);
  exec(`tsp mkdir -p ${Comands.JavaDir}/`);
  exec(`tsp touch ${Comands.JavaDir}/main.java`);
  exec(Comands.KillTs);
};

export { Run, Install };

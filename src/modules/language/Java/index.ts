import { which, echo, exec, cd } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";

const Run = (
  code: string,
  input: string
): {
  stdout: string;
  stderr: string;
} => {
  cd(Comands.JavaDir);
  exec(
    `tsp | echo ${JSON.stringify(code)} > ./main.java && echo ${JSON.stringify(
      input
    )} > ./input.txt`
  );
  const id = exec(`javac ./main.java`).stdout;
  exec(`tsp -c ${id}`);
  if (input) {
    const id_input = exec("tsp |  java Main  < input.txt > output.txt");
    exec(`tsp -c ${id_input}`);
    const id_output = exec("tsp cat output.txt");
    const execute = exec(`tsp -c ${id_output}`);
    exec(`tsp rm -rf /${Comands.Dir}/${Comands.JavaDir}/*`)
    exec(Comands.KillFinished);
    cd("..");
    return {
      stdout: execute.stdout,
      stderr: execute.stderr,
    };
  } else {
    const id_empty = exec("tsp java Main");
    const execute = exec(`tsp -c ${id_empty}`);
    exec(`tsp rm -rf /${Comands.Dir}/${Comands.JavaDir}/*`)
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

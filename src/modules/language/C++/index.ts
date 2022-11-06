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
  cd(Comands["DirC++"]);
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }
  const start = exec(
    `tsp | echo ${JSON.stringify(code)} > ./main.cpp && echo ${JSON.stringify(
      input
    )} > ./input.txt`
  ).stdout;
  exec(`tsp -c ${start}`)
  const id = exec(`tsp g++ ./main.cpp`, options).stdout;
  exec(`tsp -c ${id}`,options);
  if (input) {
    const id_output = exec("./a.out  < input.txt > output.txt && tsp cat output.txt",options).stdout;
    const execute = exec(`tsp -c ${id_output}`,options);
    exec(`tsp -k ${id_output}`);
    exec(`rm -rf /${Comands.Dir}/${Comands["DirC++"]}/*`)
    exec(Comands.KillFinished);
    cd("..");
    return {
      stdout: execute.stdout,
      stderr: execute.stderr,
    };
  } else {
    const execute = exec("./a.out",options);
    exec(`rm -rf /${Comands.Dir}/${Comands["DirC++"]}/*`,options)
    exec(Comands.KillFinished);
    cd("..");
    return {
      stdout: execute.stdout,
      stderr: execute.stderr,
    };
  }
};

const Install = (): void => {
  if (!which(Comands["C++"])) {
    exec(Comands["C++Install"]);
  }
  if (!which(Comands["C++"])) {
    echo(Message["C++"]);
  }
  cd(`/${Comands.Dir}`);
  exec(`tsp mkdir -p ${Comands["DirC++"]}/`);
  exec(`tsp touch ${Comands["DirC++"]}/main.cpp`);
  exec(Comands.KillTs);
};

export { Run, Install };

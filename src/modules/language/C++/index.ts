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
  cd(Comands["DirC++"]);
  exec(
    `ts | echo ${JSON.stringify(code)} > ./main.cpp && echo ${JSON.stringify(
      input
    )} > ./input.txt`
  );
  const id = exec(`ts g++ ./main.cpp`).stdout;
  exec(`ts -c ${id}`);
  if (input) {
    const id_input = exec("ts |  ./a.out  < input.txt > output.txt");
    exec(`ts -c ${id_input}`);
    const id_output = exec("ts cat output.txt");
    const execute = exec(`ts -c ${id_output}`);
    exec(Comands.KillFinished);
    cd("..");
    return {
      stdout: execute.stdout,
      stderr: execute.stderr,
    };
  } else {
    const id_empty = exec("ts  ./a.out");
    const execute = exec(`ts -c ${id_empty}`);
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
  exec(`ts mkdir -p ${Comands["DirC++"]}/`);
  exec(`ts touch ${Comands["DirC++"]}/main.cpp`);
  exec(Comands.KillTs);
};

export { Run, Install };

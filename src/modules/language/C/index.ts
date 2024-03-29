import { which, echo, exec } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";
import * as fs from "fs";
import { IArg, IResult } from "../../../interfaces/module.interface";
import { Code } from "./enums/code";

const Run = async ({
  code,
  input,
  timeout,
  similarWorkingJobCount,
  afterRunTest
}: IArg): Promise<IResult> => {
  const time = Date.now();
  const process = exec(
    `tsp -S ${similarWorkingJobCount} && mkdir -p /${Comands.Dir}/${Comands.DirC}/ && mkdir -p /${Comands.Dir}/${Comands.DirC}/${time} && touch /${Comands.Dir}/${Comands.DirC}/${time}/main.sh && touch /${Comands.Dir}/${Comands.DirC}/${time}/main.c`
  );
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }
  const commands = [
    `cd /${Comands.Dir}/${Comands.DirC}/${time}/`,
    `\n`,
    `echo ${JSON.stringify((afterRunTest ? Code.START : '')+' '+code + ' ' + (afterRunTest ? `  int main() {
      ${afterRunTest}
      printf("OK");
      return 0;
   }` : ''))} > /${Comands.Dir}/${
      Comands.DirC
    }/${time}/main.c && echo ${JSON.stringify(input)} > /${Comands.Dir}/${
      Comands.DirC
    }/${time}/input.txt`,
    `\n`,
    `gcc /${Comands.Dir}/${Comands.DirC}/${time}/main.c`,
    `\n`,
  ];
  if (input) {
    commands.push("./a.out  < input.txt > output.txt");
  } else {
    commands.push("./a.out  > output.txt");
  }
  commands.push(`\n`);
  commands.push(`cat /${Comands.Dir}/${Comands.DirC}/${time}/output.txt`);
  await fs.writeFileSync(
    `/${Comands.Dir}/${Comands.DirC}/${time}/main.sh`,
    commands.join(" "),
    "utf8"
  );
  const execute = process.exec(
    `tsp sh /${Comands.Dir}/${Comands.DirC}/${time}/main.sh`,
    { ...options }
  );
  if (!execute?.stdout || execute?.stderr) {
    throw new Error("not get proccess id");
  }
  const id = +execute.stdout;
  if (typeof id !== "number") {
    throw new Error("not get proccess id");
  }
  const timer = setTimeout(async () => {
    await new Promise((resolve) => {
      process.exec(
        `rm -rf /${Comands.Dir}/${Comands.DirC}/${time}`,
        { ...options, async: true },
        (codes) => {
          resolve(codes);
        }
      );
    });
    clearTimeout(timer);
  }, timeout || 1000);
  return {
    id,
    start_date: time,
  };
};

const Install = (): void => {
  if (!which(Comands.C)) {
    echo(Message.C);
  }
};

export { Run, Install };

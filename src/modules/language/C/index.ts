/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/require-await */
import { which, echo, exec, cd } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";
import * as fs from "fs";

const Run = async (
  code: string,
  input: string,
  timeout: number
): Promise<{
  stdout: string;
  stderr: string;
}> => {
  const process = cd(`/${Comands.Dir}/${Comands.DirC}`);
  process.exec("tsp rm -rf *");
  process.exec(`tsp touch ./main.sh`);
  process.exec(`tsp touch ./main.c`);
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }
  const commands = [
    `echo ${JSON.stringify(code)} > ./main.c && echo ${JSON.stringify(
      input
    )} > ./input.txt`,
    `\n`,
    "gcc ./main.c",
    `\n`,
  ];
  if (input) {
    commands.push("./a.out  < input.txt > output.txt");
  } else {
    commands.push("./a.out  > output.txt");
  }
  commands.push(`\n`);
  commands.push("rm -rf a.out && rm -rf input.txt && rm -rf main.c");
  commands.push(`\n`);
  commands.push("cat output.txt");
  await fs.writeFileSync(
    `/${Comands.Dir}/${Comands.DirC}/main.sh`,
    commands.join(" "),
    "utf8"
  );
  const id_start: number = await new Promise((resolve, reject) => {
    return process.exec(
      `tsp sh ./main.sh`,
      { ...options, async: true },
      (codes: number, stdout: string, stderr: string) => {
        if (!codes && !stderr) {
          resolve(+stdout);
        } else {
          reject(stderr);
        }
      }
    );
  });
  if (typeof id_start !== "number") {
    throw new Error("not get proccess id");
  }
  const execute: {
    stdout: string;
    stderr: string;
  } = await new Promise((resolve) => {
    return process.exec(
      `tsp -c ${id_start}`,
      { ...options, async: true },
      (_: number, stdout: string, stderr: string) => {
        process.exec(`tsp -k ${id_start}`);
        resolve({
          stdout,
          stderr,
        });
      }
    );
  });
  process.exec(Comands.KillFinished);
  return execute;
};

const Install = (): void => {
  if (!which(Comands.C)) {
    echo(Message.C);
  }
  exec(`tsp mkdir -p /${Comands.Dir}/${Comands.DirC}/`);
  exec(Comands.KillTs);
};

export { Run, Install };

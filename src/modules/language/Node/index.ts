/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/require-await */
import { which, echo, exec, cd } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";
import * as fs from "fs";

const Run = async (
  code: string,
  _: string,
  timeout: number
): Promise<{
  stdout: string;
  stderr: string;
}> => {
  const process = cd(`/${Comands.Dir}/${Comands.Node}`);
  process.exec("tsp rm -rf *");
  process.exec(`tsp touch ./main.sh`);
  process.exec(`tsp touch ./main.js`);
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }
  await fs.writeFileSync(
    `/${Comands.Dir}/${Comands.Node}/main.js`,
    code,
    "utf8"
  );
  const id_start: number = await new Promise((resolve, reject) => {
    return process.exec(
      `tsp node /${Comands.Dir}/${Comands.Node}/main.js`,
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
  if (!which(Comands.Node)) {
    echo(Message.Node);
  }
  exec(`tsp mkdir -p /${Comands.Dir}/${Comands.Node}/`);

  exec(Comands.KillTs);
};

export { Run, Install };

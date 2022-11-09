import { which, echo, exec } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";
import * as fs from "fs";
import { IArg, IResult } from "../../../interfaces/module.interface";

const Run = async ({
  code,
  timeout,
  similarWorkingJobCount,
}: IArg): Promise<IResult> => {
  const time = Date.now();
  const process = exec(
    `tsp -S ${similarWorkingJobCount} &&  mkdir -p /${Comands.Dir}/${Comands.Node} &&  mkdir -p /${Comands.Dir}/${Comands.Node}/${time} && touch /${Comands.Dir}/${Comands.Node}/${time}/main.sh && touch /${Comands.Dir}/${Comands.Node}/${time}/main.js`
  );
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }
  await fs.writeFileSync(
    `/${Comands.Dir}/${Comands.Node}/${time}/main.js`,
    code,
    "utf8"
  );
  const execute = process.exec(
    `tsp node /${Comands.Dir}/${Comands.Node}/${time}/main.js`,
    { ...options }
  );
  if (!execute?.stdout || execute?.stderr) {
    throw new Error("not get proccess id");
  }
  const id = +execute.stdout;
  if (typeof id !== "number") {
    throw new Error("not get proccess id");
  }
  await new Promise((resolve) => {
    process.exec(
      `rm -rf /${Comands.Dir}/${Comands.Node}/${time}`,
      { ...options, async: true },
      (codes) => {
        resolve(codes);
      }
    );
  });
  return {
    id,
    start_date: time,
  };
};

const Install = (): void => {
  if (!which(Comands.Node)) {
    echo(Message.Node);
  }
};

export { Run, Install };

import { which, echo, exec } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";
import * as fs from "fs";
import { IArg, IResult } from "../../../interfaces/module.interface";
import { Code } from "./enums/code";

const Run = async ({
  code,
  timeout,
  similarWorkingJobCount,
  afterRunTest,
}: IArg): Promise<IResult> => {
  const time = Date.now();
  const process = exec(
    `tsp -S ${similarWorkingJobCount} mkdir -p /${Comands.Dir}/${Comands.DirCsharp}/ && mkdir -p /${Comands.Dir}/${Comands.DirCsharp}/${time} && mkdir -p /${Comands.Dir}/${Comands.DirCsharp}/${time}/Main && touch /${Comands.Dir}/${Comands.DirCsharp}/${time}/Main/main.sh`
  );
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }
  const commands = [
    `cd /${Comands.Dir}/${Comands.DirCsharp}/${time}/Main`,
    `\n`,
    `
    dotnet new console
  `,
    `\n`,
    `echo ${afterRunTest ? JSON.stringify(Code.START+code+afterRunTest+Code.END) : JSON.stringify(code)} > /${Comands.Dir}/${
      Comands.DirCsharp
    }/${time}/Main/Program.cs`,
    `\n`,
    "dotnet run",
  ];
  commands.push(`\n`);
  await fs.writeFileSync(
    `/${Comands.Dir}/${Comands.DirCsharp}/${time}/Main/main.sh`,
    commands.join(" "),
    "utf8"
  );
  const execute = process.exec(
    `tsp sh /${Comands.Dir}/${Comands.DirCsharp}/${time}/Main/main.sh`,
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
        `rm -rf /${Comands.Dir}/${Comands.DirCsharp}/${time}`,
        { ...options, async: true },
        (codes) => {
          resolve(codes);
        }
      );
      resolve(null);
    });
    clearTimeout(timer);
  }, timeout || 1000);
  return {
    id,
    start_date: time,
  };
};

const Install = (): void => {
  if (!which(Comands.CSharp)) {
    echo(Message.CSharp);
  }
};

export { Run, Install };

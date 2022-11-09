import { which, echo, exec } from "shelljs";
import { Comands } from "../../../enums/comands";
import { Message } from "../../../enums/message";
import * as fs from "fs";
import { IArg, IResult } from "../../../interfaces/module.interface";

const Run = async ({
  code,
  input,
  timeout,
  similarWorkingJobCount,
}: IArg): Promise<IResult> => {
  const time = Date.now();
  const process = exec(
    `tsp -S ${similarWorkingJobCount} && mkdir -p /${Comands.Dir}/${Comands.JavaDir} && mkdir -p /${Comands.Dir}/${Comands.JavaDir}/${time} && touch /${Comands.Dir}/${Comands.JavaDir}/${time}/main.sh && touch /${Comands.Dir}/${Comands.JavaDir}/${time}/main.java`
  );
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }
  const commands = [
    `
    echo ${JSON.stringify(code)} > /${Comands.Dir}/${
      Comands.JavaDir
    }/${time}/main.java && echo ${JSON.stringify(input)} > /${Comands.Dir}/${
      Comands.JavaDir
    }/${time}/input.txt
  `,
    `\n`,
    `javac /${Comands.Dir}/${Comands.JavaDir}/${time}/main.java`,
    `\n`,
  ];
  if (input) {
    commands.push(
      `java -Xms128m -Xmx512m -classpath "/${Comands.Dir}/${Comands.JavaDir}/${time}/" Main  < /${Comands.Dir}/${Comands.JavaDir}/${time}/input.txt > /${Comands.Dir}/${Comands.JavaDir}/${time}/output.txt`
    );
  } else {
    commands.push(
      `java -Xms128m -Xmx512m -classpath "/${Comands.Dir}/${Comands.JavaDir}/${time}/" Main > /${Comands.Dir}/${Comands.JavaDir}/${time}/output.txt`
    );
  }
  commands.push(`\n`);
  commands.push(`cat /${Comands.Dir}/${Comands.JavaDir}/${time}/output.txt`);
  await fs.writeFileSync(
    `/${Comands.Dir}/${Comands.JavaDir}/${time}/main.sh`,
    commands.join(" "),
    "utf8"
  );
  const execute = process.exec(
    `tsp sh /${Comands.Dir}/${Comands.JavaDir}/${time}/main.sh`,
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
      `rm -rf /${Comands.Dir}/${Comands.JavaDir}/${time}`,
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
  if (!which(Comands.Java)) {
    exec(Comands.JavaInstall);
  }
  if (!which(Comands.Java)) {
    echo(Message.Java);
  }
};

export { Run, Install };

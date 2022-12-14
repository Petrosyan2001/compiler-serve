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
  afterRunTest,
}: IArg): Promise<IResult> => {
  const time = Date.now();
  const process = exec(
    `tsp -S ${similarWorkingJobCount} &&
      mkdir -p /${Comands.Dir}/${Comands.JavaDir} && mkdir -p /${Comands.Dir}/${Comands.JavaDir}/${time}
      && touch /${Comands.Dir}/${Comands.JavaDir}/${time}/main.sh && 
      touch /${Comands.Dir}/${Comands.JavaDir}/${time}/main.java`
  );
  const options: {
    timeout?: number;
  } = {};
  if (timeout) {
    options.timeout = timeout;
  }

  const commands = [
    `mkdir -p /${Comands.Dir}/${Comands.JavaDir}/${time}/example &&`,
    `mkdir -p /${Comands.Dir}/${Comands.JavaDir}/${time}/example/src &&`,
    `mkdir -p /${Comands.Dir}/${Comands.JavaDir}/${time}/example/src/test &&`,
    `mkdir -p /${Comands.Dir}/${Comands.JavaDir}/${time}/example/src/test/java &&`,
    `mkdir -p /${Comands.Dir}/${Comands.JavaDir}/${time}/example/src/test/java/example &&`,
    `touch /${Comands.Dir}/${Comands.JavaDir}/${time}/example/Jenkinsfile &&`,
    `echo ${JSON.stringify(Code.JENKINS)} > /${Comands.Dir}/${
      Comands.JavaDir
    }/${time}/example/Jenkinsfile &&`,
    `touch /${Comands.Dir}/${Comands.JavaDir}/${time}/example/pom.xml &&`,
    `echo ${JSON.stringify(Code.POM)} > /${Comands.Dir}/${
      Comands.JavaDir
    }/${time}/example/pom.xml &&`,
    `touch /${Comands.Dir}/${Comands.JavaDir}/${time}/example/src/test/java/example/Base.java &&`,
    `echo ${JSON.stringify(Code.Base)} > /${Comands.Dir}/${
      Comands.JavaDir
    }/${time}/example/src/test/java/example/Base.java &&`,
    `touch /${Comands.Dir}/${Comands.JavaDir}/${time}/example/src/test/java/example/MainTest.java &&`,
    `echo ${JSON.stringify(`
    ${Code.ImportMain}
    ${code}
    ${afterRunTest || ""}
    `)} > /${Comands.Dir}/${
      Comands.JavaDir
    }/${time}/example/src/test/java/example/MainTest.java &&`,
    `echo ${JSON.stringify(`
    ${code}
    `)} > /${Comands.Dir}/${
      Comands.JavaDir
    }/${time}/main.java && echo ${JSON.stringify(input)} > /${Comands.Dir}/${
      Comands.JavaDir
    }/${time}/input.txt
  `,
    `\n`,
    `javac /${Comands.Dir}/${Comands.JavaDir}/${time}/main.java`,
    `\n`,
  ];
  if (!afterRunTest) {
    if (input) {
      commands.push(
        `java -Xms128m -Xmx512m -classpath "/${Comands.Dir}/${Comands.JavaDir}/${time}/" Main  < /${Comands.Dir}/${Comands.JavaDir}/${time}/input.txt > /${Comands.Dir}/${Comands.JavaDir}/${time}/output.txt`
      );
      commands.push(`\n`);
    } else {
      commands.push(
        `java -Xms128m -Xmx512m -classpath "/${Comands.Dir}/${Comands.JavaDir}/${time}/" Main > /${Comands.Dir}/${Comands.JavaDir}/${time}/output.txt`
      );
      commands.push(`\n`);
    }
  }

  if (afterRunTest) {
    commands.push(
      `cd /${Comands.Dir}/${Comands.JavaDir}/${time}/example && mvn test && cd ../../../../`
    );
  } else {
    commands.push(`cat /${Comands.Dir}/${Comands.JavaDir}/${time}/output.txt`);
  }

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
  const timer = setTimeout(async () => {
    await new Promise((resolve) => {
      process.exec(
        `rm -rf /${Comands.Dir}/${Comands.JavaDir}/${time} && tsp -r ${id}`,
        { ...options, async: true },
        (codes) => {
          resolve(codes);
        }
      );
    });
    clearTimeout(timer);
  }, timeout);

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

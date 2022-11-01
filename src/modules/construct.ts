import { which,echo, exec, cd } from "shelljs";
import { Comands } from "../enums/comands";
import { Package } from "../enums/package";
import { Message } from "../enums/message";

const construct = ():void => {
   if (!which(Package.Make)){
      exec(Comands.Make)
   }
   if (!which(Package.Make)){
      echo(Message.Make);
   }
   if (!which(Package.Ts)){
      cd('./debain/ts-1.0.2');
      exec(Comands.Ts);
      cd('../../');
   }
   if (!which(Package.Ts)){
      echo(Message.Ts);
   }
}

export default construct
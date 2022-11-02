import shelljs, { which,echo, exec, cd } from "shelljs";
import { Comands } from "../enums/comands";
import { Package } from "../enums/package";
import { Message } from "../enums/message";
import { Languages } from "../modules/language";
import { Language } from "../enums/language";
shelljs.config.silent = true;

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
   for (const lang in Languages){
      Languages[lang as Language].Install()
   }
}

export default construct
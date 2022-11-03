import shelljs, { which,echo, exec } from "shelljs";
import { Comands } from "../enums/comands";
import { Package } from "../enums/package";
import { Message } from "../enums/message";
import { Languages } from "../modules/language";
import { Language } from "../enums/language";
shelljs.config.silent = true;

const construct = ():void => {
   if (!which(Package.Ts)){
      exec(Comands.Ts);
   }
   if (!which(Package.Ts)){
      echo(Message.Ts);
   }
   for (const lang in Languages){
      Languages[lang as Language].Install()
   }
}

export default construct
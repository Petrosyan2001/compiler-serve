import { which,echo, exec, exit, cd } from "shelljs";
import { Comands } from "../enums/comands";
import { Package } from "../enums/package";

const construct = () =>{
   if (!which(Package.Make)){
      exec(Comands.Make)
   }
   if (!which(Package.Make)){
      echo('Sorry, this script requires make');
      exit()
   }
   if (!which(Package.Ts)){
      cd('debain/ts-1.0.2');
      exec(Comands.Ts);
      cd('../../');
   }
   if (!which(Package.Ts)){
      echo('Sorry, this script requires ts');
      exit()
   }
   exit()
  }

export default construct
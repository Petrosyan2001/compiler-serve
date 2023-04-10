import { Language } from "../../enums/language";
import {Run as RNode, Install as INode} from "./Node";
import {Run as CplucRun, Install as CplucInstall} from "./C++";
import {Run as CRun, Install as CInstall} from "./C";
import {Run as JRun, Install as JInstall} from "./Java";
import {Run as CSharpRun, Install as CSharpInstall} from "./C#";

export const Languages = {
  [Language.Node]: {Run: RNode, Install: INode},
  [Language['C++']]: {Run: CplucRun, Install: CplucInstall},
  [Language.C]: {Run: CRun, Install: CInstall},
  [Language.Java]: {Run: JRun, Install: JInstall},
  [Language["C#"]]: {Run: CSharpRun, Install: CSharpInstall}
}
import { Language } from "../../enums/language";
import {Run as RNode, Install as INode} from "./Node";
import {Run as CplucRun, Install as CplucInstall} from "./C++";
import {Run as CRun, Install as CInstall} from "./C";

export const Languages = {
  [Language.Node]: {Run: RNode, Install: INode},
  [Language['C++']]: {Run: CplucRun, Install: CplucInstall},
  [Language.C]: {Run: CRun, Install: CInstall}
}
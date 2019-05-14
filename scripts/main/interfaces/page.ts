import { firstLetterCapital } from "../utils";
import { NcTemplate } from "./template";

export const ncPrefix = "ns";

export class NcPage {
  prefix: string;
  name: string;
  fileName?: string;
  comName?: string;
  capName?: string;
  templates?: NcTemplate[] = [];
  outlet?: boolean;
  children?: NcPage[] = [];
  constructor(param: NcPage) {
    Object.assign(this, param);
    if (!this.fileName) {
      this.fileName = !this.fileName && `${this.prefix}-${this.name}`;
    }
    if (!this.comName) {
      this.comName = `${ncPrefix}-${this.fileName}`;
    }
    if (!this.capName) {
      this.capName = this.comName
        .split("-")
        .map(x => firstLetterCapital(x))
        .join("");
    }
  }
}

export interface NcTpl {
  template?: string;
}

export interface NcImports {
  imports?: string;
}

export interface NcHtml extends NcTpl {}

export interface NcComponent extends NcTpl {}

export interface NcModule extends NcTpl, NcImports {
  custom?: string;
}

export interface NcRoutes extends NcTpl, NcImports {
  children?: string;
}

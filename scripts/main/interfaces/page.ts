import { firstLetterCapital } from "../utils";
import { NcTemplate, NcTemplateType } from "./template";

export const ncPrefix = "ns";

export class NcPage {
  prefix: string;
  label?: string;
  name: string;
  fileName?: string;
  comName?: string;
  capName?: string;
  custom?: string = "";
  templates?: NcTemplate[] = [];
  type?: NcTemplateType = "default";
  children?: NcPage[] = [];
  order?: number;
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

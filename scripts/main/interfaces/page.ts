import { firstLetterCapital } from "../utils";

export const ncPrefix = "ns";

export interface NcComponent {
  htmlTpl?: string;
}

export interface NcModule {
  imports?: string;
  custom?: string;
}

export interface NcRoutes {
  imports?: string;
  children?: string;
}

export class NcPage {
  prefix: string;
  name: string;
  fileName?: string;
  comName?: string;
  capName?: string;
  component?: NcComponent = {};
  module?: NcModule = { imports: "", custom: "" };
  routes?: NcRoutes = { imports: "", children: "" };
  outlet?: boolean;
  constructor(param: NcPage) {
    Object.assign(this, param);
    if (!this.fileName) this.fileName = `${this.prefix}-${this.name}`;
    if (!this.comName) this.comName = `${ncPrefix}-${this.fileName}`;
    if (!this.capName)
      this.capName = this.comName
        .split("-")
        .map(x => firstLetterCapital(x))
        .join("");
    if (this.outlet) {
      this.component.htmlTpl = "<router-outlet></router-outlet>";
    }
  }
}

export class NcTemplate {
  fileName?: string;
  name?: string;
  extension?: NcExtension;
  tplPath?: string;
  genPath?: string;
  genName?: string;
  content?: string;
  syswords? = {
    imports: "",
    custom: "",
    children: ""
  };
  keywords?: { [prop: string]: string } = {};
  constructor(param: NcTemplate) {
    Object.assign(this, param);
    if (!param.extension) {
      this.extension = "ts";
    }
    let custom = "",
      type = "";
    let slt = this.name.split("-");
    type = slt[slt.length - 1];
    custom = this.fileName;
    if (slt.length > 1) {
      custom += `-${slt.slice(0, slt.length - 1).join("-")}`;
    }
    this.genName = `${custom}.${type}.${this.extension}`;
  }
}

export type NcTplName = string | NcTemplate;

export type NcExtension = "ts" | "html" | "scss";

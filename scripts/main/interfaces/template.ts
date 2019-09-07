export class NcTemplate {
  fileName?: string;
  name?: string;
  extension?: NcExtension;
  tplPath?: string;
  genPath?: string;
  genName?: string;
  content?: string;
  type?: NcTemplateType = "default";
  syswords? = {
    imports: "",
    modules: "",
    loadChildren: "",
    constant: "",
    custom: "",
    declarations: ""
  };
  keywords?: { [prop: string]: string } = {};
  constructor(param: NcTemplate) {
    Object.assign(this, param);
    if (!param.extension) {
      this.extension = "ts";
    }
    let name = "",
      type = "";
    let slt = this.name.split("-");
    type = slt[slt.length - 1];
    name = this.fileName;
    if (slt.length > 1) {
      name += `-${slt.slice(0, slt.length - 1).join("-")}`;
    }
    name = name.replace(new RegExp(`(.*)-${this.type}`, "g"), "$1");
    this.genName = `${name}.${type}.${this.extension}`;
  }
}

export type NcTplName = string | NcTemplate;

export type NcExtension = "ts" | "html" | "scss";

/**
 * 模板类型
 * default 默认，组件页面
 * router 路由节点页面
 * custome 自定义内容页面
 */
export type NcTemplateType = "default" | "router" | "custom";

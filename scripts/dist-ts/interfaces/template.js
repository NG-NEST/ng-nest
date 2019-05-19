"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NcTemplate {
    constructor(param) {
        this.type = "default";
        this.syswords = {
            imports: "",
            modules: "",
            loadChildren: "",
            constant: "",
            custom: ""
        };
        this.keywords = {};
        Object.assign(this, param);
        if (!param.extension) {
            this.extension = "ts";
        }
        let name = "", type = "";
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
exports.NcTemplate = NcTemplate;

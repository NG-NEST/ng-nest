"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NcTemplate {
    constructor(param) {
        this.syswords = {
            imports: "",
            custom: "",
            children: ""
        };
        this.keywords = {};
        Object.assign(this, param);
        if (!param.extension) {
            this.extension = "ts";
        }
        let custom = "", type = "";
        let slt = this.name.split("-");
        type = slt[slt.length - 1];
        custom = this.fileName;
        if (slt.length > 1) {
            custom += `-${slt.slice(0, slt.length - 1).join("-")}`;
        }
        this.genName = `${custom}.${type}.${this.extension}`;
    }
}
exports.NcTemplate = NcTemplate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.ncPrefix = "ns";
class NcPage {
    constructor(param) {
        this.component = {};
        this.module = { imports: "", custom: "" };
        this.routes = { imports: "", children: "" };
        Object.assign(this, param);
        if (!this.fileName)
            this.fileName = `${this.prefix}-${this.name}`;
        if (!this.comName)
            this.comName = `${exports.ncPrefix}-${this.fileName}`;
        if (!this.capName)
            this.capName = this.comName
                .split("-")
                .map(x => utils_1.firstLetterCapital(x))
                .join("");
        if (this.outlet) {
            this.component.htmlTpl = "<router-outlet></router-outlet>";
        }
    }
}
exports.NcPage = NcPage;

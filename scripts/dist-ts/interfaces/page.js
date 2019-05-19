"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.ncPrefix = "ns";
class NcPage {
    constructor(param) {
        this.custom = "";
        this.templates = [];
        this.type = "default";
        this.children = [];
        Object.assign(this, param);
        if (!this.fileName) {
            this.fileName = !this.fileName && `${this.prefix}-${this.name}`;
        }
        if (!this.comName) {
            this.comName = `${exports.ncPrefix}-${this.fileName}`;
        }
        if (!this.capName) {
            this.capName = this.comName
                .split("-")
                .map(x => utils_1.firstLetterCapital(x))
                .join("");
        }
    }
}
exports.NcPage = NcPage;

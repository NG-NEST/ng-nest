"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const utils_1 = require("../../../utils");
const _1 = require(".");
class NcComponents {
    init(folder) {
        this.componentsPath = path.resolve(__dirname, folder);
        const componentsFolder = fs.readdirSync(this.componentsPath);
        componentsFolder.forEach(dirName => {
            const readmePath = this.getReadmePath(dirName);
            let html = utils_1.mdToHtml(readmePath);
            let page = new _1.NcUiPage(dirName);
            if (html) {
            }
        });
    }
    getReadmePath(dirName) {
        return path.resolve(this.componentsPath, dirName, "readme.md");
    }
}
exports.NcComponents = NcComponents;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const md_to_html_1 = require("../../../utils/md-to-html");
class Components {
    init(folder) {
        this.componentsPath = path.resolve(__dirname, folder);
        const componentsFolder = fs.readdirSync(this.componentsPath);
        componentsFolder.forEach(dirName => {
            const readmePath = `${this.componentsPath}/${dirName}/readme.md`;
            let html = md_to_html_1.mdToHtml(readmePath);
            let iconsTemplate = "";
            if (html) {
                console.log(html);
            }
        });
    }
}
exports.Components = Components;

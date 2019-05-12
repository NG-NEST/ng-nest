"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const md = require("marked");
function mdToHtml(mdPath) {
    if (!fs.existsSync(mdPath))
        return;
    return md(fs.readFileSync(mdPath, "utf8"));
}
exports.mdToHtml = mdToHtml;

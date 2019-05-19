"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const md = require("marked");
function mdToHtml(path) {
    if (!fs.existsSync(path))
        return;
    return md(fs.readFileSync(path, "utf8"));
}
exports.mdToHtml = mdToHtml;

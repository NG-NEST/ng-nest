"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md = require("marked");
const yfm = require("yaml-front-matter");
const fs = require("fs-extra");
function parseMdDoc(path) {
    const file = fs.readFileSync(path, "utf8");
    const meta = yfm.loadFront(file);
    const content = meta.__content;
    delete meta.__content;
    const remark = require("remark")();
    const ast = remark.parse(content);
    let contentStr = "";
    for (let i = 0; i < ast.children.length; i++) {
        const child = ast.children[i];
        contentStr += md(remark.stringify(child));
    }
    return {
        meta: meta,
        content: contentStr
    };
}
exports.parseMdDoc = parseMdDoc;

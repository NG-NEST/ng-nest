"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const parse_md_doc_1 = require("./parse-md-doc");
const tplDir = path.resolve(__dirname, "../../main/templates");
function createTabs(examples) {
    let cates = fs.readdirSync(examples.path, "utf8");
    cates.forEach(x => {
        let cate = {
            name: x,
            path: path.join(examples.path, x),
            codeBoxes: []
        };
        createCodeBoxes(cate);
    });
}
exports.createTabs = createTabs;
function createCodeBoxes(cate) {
    let html = fs.readFileSync(path.join(cate.path, `${cate.name}.html`), "utf-8");
    let readme = parse_md_doc_1.parseMdDoc(path.join(cate.path, "readme.md"));
    let box = {
        demo: html,
        code: html,
        description: readme.content
    };
    cate.order = readme.meta.order;
    cate.label = readme.meta.label;
    cate.codeBoxes.push(box);
}
exports.createCodeBoxes = createCodeBoxes;

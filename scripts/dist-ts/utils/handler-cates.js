"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const examples_1 = require("../interfaces/examples");
const _1 = require(".");
const _ = require("lodash");
const tplDir = path.resolve(__dirname, "../../main/templates");
function hanlderCates(cates) {
    let folder = fs.readdirSync(cates.folderPath, "utf8");
    cates.list = [];
    folder.forEach(x => {
        let catePath = path.join(cates.folderPath, x);
        if (fs.lstatSync(catePath).isDirectory()) {
            let readme = _1.parseMdDoc(path.join(catePath, "readme.md"));
            let html = fs.readFileSync(path.join(catePath, `${x}.html`), "utf-8");
            cates.list.push({
                name: x,
                order: readme.meta.order,
                label: readme.meta.label,
                path: catePath,
                codeBoxes: {
                    demo: html,
                    code: [{ type: examples_1.NcCodeType.HTML, content: html }],
                    description: readme.content
                }
            });
            cates.list = _.sortBy(cates.list, "order");
        }
    });
}
exports.hanlderCates = hanlderCates;
function handlerCodeBoxes(cate) {
}
exports.handlerCodeBoxes = handlerCodeBoxes;

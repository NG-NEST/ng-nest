"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const _1 = require(".");
const _ = require("lodash");
const tplDir = path.resolve(__dirname, "../../main/templates");
function handlerTabs(tabs) {
    tabs.tplPath = path.join(tplDir, "tabs-component.template.html");
    let folder = fs.readdirSync(tabs.folderPath, "utf8");
    tabs.tabs = [];
    folder.forEach(x => {
        let readme = _1.parseMdDoc(path.join(tabs.folderPath, x, "readme.md"));
        let tab = {
            name: x,
            label: readme.meta.label,
            order: readme.meta.order,
            content: readme.content
        };
        tabs.tabs.push(tab);
    });
    tabs.tabs = _.sortBy(tabs.tabs, "order");
    return tabs;
}
exports.handlerTabs = handlerTabs;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabs_1 = require("./../interfaces/tabs");
const path = require("path");
const handler_tabs_1 = require("./handler-tabs");
const handler_cates_1 = require("./handler-cates");
const tplDir = path.resolve(__dirname, "../../main/templates");
function handlerComponent(page) {
    if (page.custom.indexOf("__examples") > -1) {
        handlerExamples(page);
    }
}
exports.handlerComponent = handlerComponent;
function handlerExamples(page) {
    let examples = {};
    examples.path = path.join(page.path, "examples");
    let tabs = handler_tabs_1.handlerTabs({ layout: tabs_1.NcTabsLayoutEnum.Left, folderPath: examples.path });
    tabs.tabs.forEach(x => {
        let cates = { folderPath: path.join(tabs.folderPath, x.name) };
        handler_cates_1.hanlderCates(cates);
        console.log(cates);
    });
}
exports.handlerExamples = handlerExamples;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const generate_page_1 = require("./generate-page");
const handler_tabs_1 = require("./handler-tabs");
const tplDir = path.resolve(__dirname, "../../main/templates");
function handlerComponent(page) {
    if (page.custom.indexOf("__examples") > -1) {
        createExamples(page);
    }
}
exports.handlerComponent = handlerComponent;
function createExamples(page) {
    let examples = {};
    let temp = fs.readFileSync(path.join(tplDir, "examples-component.template.html"), "utf8");
    examples.path = path.join(page.path, "examples");
    handler_tabs_1.createTabs(examples);
    page.custom = generate_page_1.replaceKey(page.custom, "__examples", temp);
}
exports.createExamples = createExamples;

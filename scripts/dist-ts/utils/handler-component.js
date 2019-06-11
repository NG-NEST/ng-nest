"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const generate_page_1 = require("./generate-page");
const tplDir = path.resolve(__dirname, "../../main/templates");
function handlerComponent(page) {
    if (page.custom.indexOf("__examples") > -1) {
        createExamples(page);
    }
}
exports.handlerComponent = handlerComponent;
function createExamples(page) {
    let temp = fs.readFileSync(path.join(tplDir, "examples-component.template.html"), "utf8");
    let dir = path.join(page.path, "examples");
    let examples = fs.readdirSync(dir, "utf8");
    createTabs(page, examples.map(x => path.join(dir, x)));
    page.custom = generate_page_1.replaceKey(page.custom, "__examples", temp);
}
exports.createExamples = createExamples;
function createTabs(page, exampleDirs) {
    console.log(exampleDirs);
}
exports.createTabs = createTabs;

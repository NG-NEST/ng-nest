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
    let examples = {};
    let temp = fs.readFileSync(path.join(tplDir, "examples-component.template.html"), "utf8");
    examples.path = path.join(page.path, "examples");
    createTabs(examples);
    page.custom = generate_page_1.replaceKey(page.custom, "__examples", temp);
}
exports.createExamples = createExamples;
function createTabs(examples) {
    let cates = fs.readdirSync(examples.path, "utf8");
    cates.forEach(x => {
        let cate = {};
        cate.path = path.join(examples.path, x);
    });
}
exports.createTabs = createTabs;

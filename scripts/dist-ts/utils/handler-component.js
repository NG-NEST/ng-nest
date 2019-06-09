"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const generate_page_1 = require("./generate-page");
const tplDir = path.resolve(__dirname, "../../main/templates");
function handlerComponent(page) {
    createExamples(page);
}
exports.handlerComponent = handlerComponent;
function createExamples(page) {
    let temp = fs.readFileSync(path.join(tplDir, "examples-component.template.html"), "utf8");
    page.custom = generate_page_1.replaceKey(page.custom, "__examples", temp);
    console.log(page.custom);
}
exports.createExamples = createExamples;

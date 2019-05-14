"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const check_mkdir_1 = require("./check-mkdir");
const util_1 = require("util");
function generatePage(page) {
    page.templates.forEach(x => {
        x.content = replaceKeyByPage(page, "__", fs.readFileSync(x.tplPath, "utf8"));
        x.content = replaceKeyByObject(x.content, x.syswords, "__");
        x.content = replaceKeyByObject(x.content, x.keywords);
        check_mkdir_1.checkMkdir(x.genPath.replace(x.genName, ""));
        fs.writeFileSync(x.genPath, x.content, "utf8");
    });
}
exports.generatePage = generatePage;
function replaceKeyByPage(page, prefix, template) {
    for (let key in page) {
        template = replaceKey(template, `${prefix}${key}`, page[key]);
    }
    return template;
}
exports.replaceKeyByPage = replaceKeyByPage;
function replaceKeyByObject(content, object, prefix = "") {
    if (!util_1.isObject(object)) {
        return content;
    }
    for (let key in object) {
        content = replaceKey(content, `${prefix}${key}`, object[key]);
    }
    return content;
}
exports.replaceKeyByObject = replaceKeyByObject;
function replaceKey(content, key, value) {
    return content.replace(new RegExp(`{{ ${key} }}`, "g"), value);
}
exports.replaceKey = replaceKey;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const util_1 = require("util");
const template_1 = require("../interfaces/template");
const page_1 = require("../interfaces/page");
const check_mkdir_1 = require("./check-mkdir");
const tplDir = path.resolve(__dirname, "../../main/templates");
function handlerPage(page, dir) {
    let templates = ["component", "module", "routes-module"];
    if (page.outlet) {
        templates.unshift({ name: "component", extension: "html" });
    }
    handleTemplates(page, tplDir, dir, ...templates);
}
exports.handlerPage = handlerPage;
function handleTemplates(page, fromDir, toDir, ...name) {
    let tpls = [];
    name.forEach(x => {
        let tpl;
        if (util_1.isString(x)) {
            tpl = new template_1.NcTemplate({ fileName: page.fileName, name: x });
        }
        else {
            x.fileName = page.fileName;
            tpl = new template_1.NcTemplate(x);
        }
        tpl.tplPath = path.join(fromDir, `${tpl.name}.template.${tpl.extension}`);
        tpl.genPath = path.join(toDir, `${tpl.genName}`);
        tpl.content = replaceKeyByPage(page, "__", fs.readFileSync(tpl.tplPath, "utf8"))[0];
        check_mkdir_1.checkMkdir(toDir);
        fs.writeFileSync(tpl.genPath, tpl.content, "utf8");
        tpls.push(tpl);
    });
    page.templates = [...page.templates, ...tpls];
    return tpls;
}
exports.handleTemplates = handleTemplates;
function replaceKeyByPage(page, prefix, ...templates) {
    for (let key in page) {
        templates = templates.map(x => {
            x = replaceKey(x, `${prefix}${key}`, page[key]);
            return x;
        });
    }
    return templates;
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
function createRouterOutlet(name) {
    return new page_1.NcPage({
        prefix: name,
        name: name,
        fileName: name,
        outlet: true
    });
}
exports.createRouterOutlet = createRouterOutlet;

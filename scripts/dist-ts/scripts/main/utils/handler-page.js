"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util_1 = require("util");
const template_1 = require("../interfaces/template");
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
        tpls.push(tpl);
    });
    page.templates = [...page.templates, ...tpls];
    return tpls;
}
exports.handleTemplates = handleTemplates;
function replaceKey(page, ...templates) {
    for (let key in page) {
        templates = templates.map(x => {
            x = x.replace(new RegExp(`{{ ${key} }}`, "g"), page[key]);
            if (util_1.isObject(page[key]))
                x = replaceKey(page[key], x)[0];
            return x;
        });
    }
    return templates;
}
exports.replaceKey = replaceKey;

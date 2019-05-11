"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const util_1 = require("util");
const tplDir = path.resolve(__dirname, "../../main/templates");
function generatePage(page, dir) {
    let htmlTpl = page.component.htmlTpl;
    let componentTpl = fs.readFileSync(`${tplDir}/component.template.ts`, "utf8");
    let moduleTpl = fs.readFileSync(`${tplDir}/module.template.ts`, "utf8");
    let routesTpl = fs.readFileSync(`${tplDir}/routes.template.ts`, "utf8");
    const templates = replaceKey(page, htmlTpl, componentTpl, moduleTpl, routesTpl);
    fs.writeFileSync(path.join(dir, `${page.fileName}.component.html`), templates[0], "utf8");
    fs.writeFileSync(path.join(dir, `${page.fileName}.component.ts`), templates[1], "utf8");
    fs.writeFileSync(path.join(dir, `${page.fileName}.module.ts`), templates[2], "utf8");
    fs.writeFileSync(path.join(dir, `${page.fileName}-routes.module.ts`), templates[3], "utf8");
}
exports.generatePage = generatePage;
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

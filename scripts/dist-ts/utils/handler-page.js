"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util_1 = require("util");
const template_1 = require("../interfaces/template");
const page_1 = require("../interfaces/page");
const tplDir = path.resolve(__dirname, "../../main/templates");
function handlerPage(page, dir) {
    let templates = ["component", "module", "routes-module"];
    templates.unshift({
        name: `${page.type}-component`,
        extension: "html",
        type: page.type
    });
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
function createRouterOutlet(name) {
    return new page_1.NcPage({
        prefix: name,
        name: name,
        fileName: name,
        type: "router"
    });
}
exports.createRouterOutlet = createRouterOutlet;
function pageAddChildren(page, children) {
    if (page && children) {
        let routes = page.templates.find(x => x.name === "routes-module");
        if (routes) {
            children.forEach((x, index) => {
                let route = `      {
        path: "${x.name}",
        loadChildren: "./${x.name}/${x.fileName}.module#${x.capName}Module"
      }`;
                routes.syswords.loadChildren += `\n${route}${index !== children.length - 1 ? "," : "\n    "}`;
            });
        }
    }
}
exports.pageAddChildren = pageAddChildren;

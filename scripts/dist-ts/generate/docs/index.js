"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
const utils_1 = require("../../utils");
const path = require("path");
const menus_1 = require("./menus");
exports.genDir = path.resolve(__dirname, "../../../../src/main/docs-gen");
exports.docsPrefix = "docs";
exports.ncMenus = menus_1.menus;
exports.ncRootMenus = menus_1.menus.filter(x => x.parentId == null);
class NcDocs {
    constructor() {
        this.ui = new ui_1.NcUi();
        this.children = [];
        this.genComponent();
    }
    init() {
        this.ui.init();
    }
    genComponent() {
        this.page = utils_1.createRouterOutlet(exports.docsPrefix);
        utils_1.handlerPage(this.page, exports.genDir);
        this.genChildren();
    }
    genChildren() {
        exports.ncRootMenus.forEach(x => {
            let page = utils_1.createRouterOutlet(x.name);
            utils_1.handlerPage(page, path.join(exports.genDir, x.name));
            this.children = [...this.children, page];
            console.log(page.templates);
        });
    }
}
exports.NcDocs = NcDocs;
global["NcDocs"] = new NcDocs();
global["NcDocs"].init();

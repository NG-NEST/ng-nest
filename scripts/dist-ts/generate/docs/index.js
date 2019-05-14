"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("../../interfaces/page");
const utils_1 = require("../../utils");
const path = require("path");
const menus_1 = require("./menus");
const util_1 = require("util");
exports.genDir = path.resolve(__dirname, "../../../../src/main/docs-gen");
exports.docsPrefix = "docs";
exports.ncMenus = menus_1.menus;
exports.ncChildrenMenus = menus_1.menus.filter(x => x.parentId == null);
class NcDocs {
    constructor() {
        this.genDir = exports.genDir;
        this.genComponent();
    }
    genComponent() {
        this.page = utils_1.createRouterOutlet(exports.docsPrefix);
        utils_1.handlerPage(this.page, exports.genDir);
        this.addChildren(this.page, exports.genDir);
        utils_1.generatePage(this.page);
        console.log(JSON.stringify(this.page, null, 4));
    }
    addChildren(page, dir, parentId = null) {
        let children = menus_1.menus.filter(x => x.parentId === parentId);
        children.forEach(x => {
            let child;
            child = util_1.isNullOrUndefined(x.router)
                ? utils_1.createRouterOutlet(x.name)
                : new page_1.NcPage({ name: x.name, prefix: `${exports.docsPrefix}` });
            let folder = path.join(dir, x.name);
            utils_1.handlerPage(child, folder);
            page.children = [...page.children, child];
            this.addChildren(child, folder, x.id);
            utils_1.generatePage(child);
        });
        utils_1.pageAddChildren(page, page.children);
    }
}
exports.NcDocs = NcDocs;
global["NcDocs"] = new NcDocs();

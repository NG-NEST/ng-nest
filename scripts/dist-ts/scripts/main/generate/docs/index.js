"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./../../../../src/environments/routes");
const ui_1 = require("./ui");
const page_1 = require("../../interfaces/page");
const utils_1 = require("../../utils");
const path = require("path");
exports.genDir = path.resolve(__dirname, "../../../../src/main/docs-gen");
exports.docsPrefix = "docs";
exports.ncMenus = routes_1.menus;
exports.ncRootMenus = routes_1.menus.filter(x => x.parentId == null);
class NcDocs {
    constructor() {
        this.ui = new ui_1.NcUi();
        this.genComponent();
    }
    init() {
        this.ui.init();
    }
    genComponent() {
        this.page = new page_1.NcPage({
            prefix: exports.docsPrefix,
            name: "docs",
            fileName: "docs",
            outlet: true
        });
        utils_1.handlerPage(this.page, exports.genDir);
    }
}
exports.NcDocs = NcDocs;
global["NcDocs"] = new NcDocs();
global["NcDocs"].init();

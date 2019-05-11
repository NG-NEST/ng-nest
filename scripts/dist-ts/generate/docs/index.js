"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
const interfaces_1 = require("../../interfaces");
const utils_1 = require("../../utils");
const path = require("path");
const genDir = path.resolve(__dirname, "../../../../src/main/docs-gen");
exports.docsPrefix = "docs";
class NcDocs {
    constructor() {
        this.ui = new ui_1.NcUi();
        this.genComponent();
        this.ui.init();
    }
    genComponent() {
        let page = new interfaces_1.NcPage({
            prefix: exports.docsPrefix,
            name: "docs",
            fileName: "docs",
            outlet: true
        });
        utils_1.generatePage(page, genDir);
    }
}
exports.NcDocs = NcDocs;
exports.docs = new NcDocs();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("../../interfaces/page");
const utils_1 = require("../../utils");
const path = require("path");
const fs = require("fs-extra");
exports.docsDir = path.resolve(__dirname, "../../../../docs");
exports.genDir = path.resolve(__dirname, "../../../../src/main/docs");
exports.genMenusDir = path.resolve(__dirname, "../../../../src/environments");
exports.docsPrefix = "docs";
class NcDocs {
    constructor() {
        this.genDir = exports.genDir;
        this.menus = [];
        this.genPages();
    }
    genPages() {
        this.page = utils_1.createRouterOutlet(exports.docsPrefix);
        utils_1.handlerPage(this.page, exports.genDir);
        this.addChildren(this.page, exports.genDir, exports.docsDir, `./${exports.docsPrefix}`);
        utils_1.generatePage(this.page);
        utils_1.generateMenu(exports.genMenusDir, this.menus);
    }
    addChildren(page, genDir, docDir, router, index) {
        let children = fs.readdirSync(docDir);
        children.forEach((x, i) => {
            const dir = path.join(docDir, x);
            const stat = fs.statSync(dir);
            if (stat.isDirectory()) {
                const read = utils_1.parseMdDoc(path.join(dir, "readme.md"));
                let child;
                child =
                    read.meta.type == "router"
                        ? utils_1.createRouterOutlet(x)
                        : new page_1.NcPage({
                            name: x,
                            prefix: exports.docsPrefix,
                            type: "custom",
                            custom: read.content
                        });
                const folder = path.join(genDir, x);
                utils_1.handlerPage(child, folder);
                page.children = [...page.children, child];
                const id = index == null ? `${i}` : `${index}-${i}`;
                const parentId = index == null ? null : `${index}`;
                this.menus = [
                    ...this.menus,
                    Object.assign({
                        id: id,
                        parentId: parentId,
                        name: x,
                        router: `${router}/${x}`
                    }, read.meta)
                ];
                this.addChildren(child, folder, dir, `${router}/${x}`, id);
                utils_1.generatePage(child);
            }
        });
        utils_1.pageAddChildren(page, page.children);
    }
}
exports.NcDocs = NcDocs;
global["NcDocs"] = new NcDocs();

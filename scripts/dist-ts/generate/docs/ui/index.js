"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("./../../../interfaces/page");
const components_1 = require("./components");
const util_1 = require("util");
const __1 = require("..");
const componentsFolder = "../../../../../libraries/ng-moon/src/components";
const uiPrefix = `${__1.docsPrefix}-ui`;
class NcUiPage extends page_1.NcPage {
    constructor(param) {
        if (util_1.isString(param))
            param = { name: param, prefix: uiPrefix };
        super(param);
    }
}
exports.NcUiPage = NcUiPage;
class NcUi {
    constructor() {
        this.components = new components_1.NcComponents();
    }
    init() {
        this.components.init(componentsFolder);
    }
}
exports.NcUi = NcUi;

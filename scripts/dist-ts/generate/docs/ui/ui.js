"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("./components");
const componentsFolder = "../../../../../libraries/ng-moon/src/components";
class Ui {
    constructor() {
        this.components = new components_1.Components();
    }
    init() {
        this.components.init(componentsFolder);
    }
}
exports.Ui = Ui;
const ui = new Ui();
ui.init();

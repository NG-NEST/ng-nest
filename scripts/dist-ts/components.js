"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fs = require("fs-extra");
const Path = require("path");
class Components {
    constructor() {
        this.componentsPath = Path.resolve(__dirname, "../../libraries/ng-moon/src/components");
    }
    init() {
        const componentsFolder = Fs.readdirSync(this.componentsPath);
    }
}
exports.Components = Components;
//# sourceMappingURL=components.js.map
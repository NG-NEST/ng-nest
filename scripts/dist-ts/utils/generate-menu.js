"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
function generateMenu(genDir, menus) {
    fs.writeFileSync(`${genDir}/menus.ts`, `import { Menu } from "./routes";
export const menus: Menu[] = ${JSON.stringify(menus, null, 2)}`, "utf8");
}
exports.generateMenu = generateMenu;

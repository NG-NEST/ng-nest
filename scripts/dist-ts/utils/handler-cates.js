"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const tplDir = path.resolve(__dirname, "../../main/templates");
function hanlderCates(cates) {
    let floder = fs.readdirSync(cates.folderPath, "utf8");
    floder.forEach(x => {
        console.log(fs.lstatSync(path.join(cates.folderPath, x)).isDirectory());
    });
}
exports.hanlderCates = hanlderCates;
function handlerCodeBoxes(cate) {
}
exports.handlerCodeBoxes = handlerCodeBoxes;

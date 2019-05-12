"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
function checkMkdir(folderPath) {
    const pathArr = folderPath.split("\\");
    let path = "";
    for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[i]) {
            path += path == "" ? `${pathArr[i]}` : `\\${pathArr[i]}`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
        }
    }
}
exports.checkMkdir = checkMkdir;

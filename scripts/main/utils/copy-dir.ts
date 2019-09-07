import * as fs from "fs-extra";
import * as path from "path";
import { checkMkdir } from "./check-mkdir";

export function copyDir(from: string, to: string, exclude = []) {
  let dir = fs.readdirSync(from, "utf8");
  checkMkdir(to);
  for (let x of dir) {
    let fromDir = path.join(from, x);
    let toDir = path.join(to, x);
    let lstat = fs.lstatSync(fromDir);
    if (lstat.isDirectory()) {
      copyDir(fromDir, toDir, exclude);
    } else {
      if (exclude && exclude.length > 0) {
        let init = false;
        for (let item of exclude) {
          init = x.endsWith(item);
          if (init) break;
        }
        if (!init) {
          fs.copyFileSync(fromDir, toDir);
        }
      }
    }
  }
}

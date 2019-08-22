import * as path from "path";
import * as fs from "fs-extra";
import * as readline from "readline";
import * as _ from "lodash";
import { NcStyle } from "../interfaces/style";

/**
 * 样式文件处理
 *
 * @export
 * @param {string} fsPath
 */
export function hanlderStyle(fsPath: string): Promise<NcStyle[]> {
  return new Promise((res, rej) => {
    let lines = readline.createInterface({
      input: fs.createReadStream(fsPath)
    });

    let exports: NcStyle[] = [];
    let index = 1;
    let docItem: any = {};

    lines.on("line", (line: string) => {
      line = line.trim();
      if (line.startsWith("/*") && line.endsWith("*/")) {
        docItem[index] = line.match(/(?<=\/\*).*?(?=\*\/)/)[0].trim();
      } else if (line.startsWith("$")) {
        let spt = line.split(":");
        let name = spt[0].trim();
        let value = spt.length > 1 ? spt[1].trim().replace(";", "") : "";
        let doc = docItem[index - 1];
        exports.push({ name: name, value: value, label: doc ? doc : "" });
      }
      index++;
    });
    lines.on("close", () => {
      res(exports);
    });
  });
}

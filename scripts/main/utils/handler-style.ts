import * as path from "path";
import * as fs from "fs-extra";
import * as readline from "readline";
import * as _ from "lodash";
import { NcStyle } from "../interfaces/style";
import { getThemes } from "./themes";

/**
 * 样式文件处理
 *
 * @export
 * @param {string} fsPath
 */
export function hanlderStyle(fsPath: string): Promise<NcStyle[]> {
  return new Promise(async (res, rej) => {
    let lines = readline.createInterface({
      input: fs.createReadStream(fsPath)
    });

    let styles: NcStyle[] = [];
    let index = 1;
    let docItem: any = {};

    lines.on("line", async (line: string) => {
      line = line.trim();
      if (line.startsWith("/*") && line.endsWith("*/")) {
        docItem[index] = line.match(/(?<=\/\*).*?(?=\*\/)/)[0].trim();
      } else if (line.startsWith("$")) {
        let spt = line.split(":");
        let name = spt[0].trim();
        let value = spt.length > 1 ? spt[1].trim().replace(";", "") : "";
        let doc = docItem[index - 1];
        let style = {
          name: name,
          value: value,
          label: doc ? doc : ""
        };
        paramReplace(style);
        styles.push(style);
      }
      index++;
    });
    lines.on("close", () => {
      res(styles);
    });
  });
}

export function paramReplace(style: NcStyle) {
  if (style.value.indexOf("$") < 0) {
    return;
  }
  let themes = global["NcThemes"];
  let spt = style.value.split(" ");

  let newSpt = _.map(spt, (x: string) => {
    if (x.startsWith("$")) {
      let param = _.find(themes, y => y.name === x);
      return param ? paramReplace(param.value) : "";
    } else {
      return x;
    }
  });

  return _.join(newSpt, " ");
}

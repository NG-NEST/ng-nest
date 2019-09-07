import { NcStyle } from "../interfaces/style";
import * as readline from "readline";
import * as fs from "fs-extra";
import * as path from "path";

export const styleDir = path.resolve(
  __dirname,
  "../../../libraries/ng-moon/src/style"
);

/**
 * 全局样式参数
 *
 * @export
 */
export function getThemes(): Promise<NcStyle[]> {
  return new Promise((res, rej) => {
    if (global["NcThemes"] != null) {
      res(global["NcThemes"]);
    } else {
      let lines = readline.createInterface({
        input: fs.createReadStream(
          path.join(styleDir, "themes", "_default.scss")
        )
      });

      let styles: NcStyle[] = [];
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
          styles.push({ name: name, value: value, label: doc ? doc : "" });
        }
        index++;
      });
      lines.on("close", () => {
        global["NcThemes"] = styles;
        res(styles);
      });
    }
  });
}

import * as path from "path";
import * as fs from "fs-extra";
import * as readline from "readline";
import { NcType, NcObjectType, NcProperty } from "../interfaces/type";

/**
 * 类型文件处理
 *
 * @export
 * @param {string} fsPath
 */
export function hanlderType(fsPath: string): Promise<NcType[]> {
  return new Promise((res, rej) => {
    let lines = readline.createInterface({
      input: fs.createReadStream(fsPath)
    });

    let exports: NcType[] = [];
    let type: NcType = {};
    let index = 1;
    let doc = [];
    let isReadDoc = false;
    let isReadType = false;
    let docItem: any = {};

    lines.on("line", (line: string) => {
      line = line.trim();
      if (isReadDoc) {
        docItem[index] = line.startsWith("*")
          ? line.replace("*", "").trim()
          : line;
      }
      if (line.trim().startsWith("/**")) {
        isReadDoc = true;
        docItem[index] = "";
        docItem.start = index;
      } else if (line.startsWith("*/")) {
        isReadDoc = false;
        docItem.end = index;
        line = line.replace("*/", "");
        docItem[index] = line;
        doc.push(docItem);
        docItem = {};
      } else if (line.startsWith("export")) {
        let docItem = doc.find(x => x.end == index - 1);
        if (docItem) {
          let object = line.replace("export", "").trim();
          type.object = object.slice(0, object.indexOf(" ")) as NcObjectType;
          let name = object.replace(type.object, "").trim();
          type.name = name.slice(0, name.indexOf(" "));
          type.label = docItem[docItem.start + 1];
          type.description = getDoc(docItem, "description");
          type.properties = [];
          if (type.object !== NcObjectType.Const) isReadType = true;
        }
      } else if (line.startsWith("}")) {
        isReadType = false;
        if (JSON.stringify(type) != "{}") {
          exports.push(type);
          type = {};
        }
      }
      if (
        !isReadDoc &&
        isReadType &&
        line != "" &&
        !line.startsWith("export")
      ) {
        let docItem = doc.find(x => x.end == index - 1);
        let spt = line.split(":");
        if (spt.length <= 1) spt.push("");
        if (docItem) {
          let property: NcProperty = {
            name: spt[0].replace("?", "").trim(),
            type: spt[1].replace(";", "").trim(),
            label: docItem[docItem.start + 1],
            defalut: getDoc(docItem, "default"),
            description: getDoc(docItem, "description")
          };
          type.properties.push(property);
        }
      }
      index++;
    });
    lines.on("close", () => {
      res(exports);
    });
  });
}

/**
 * 获取注释内容
 *
 * @export
 * @param {object} doc
 * @param {string} prop
 * @returns
 */
export function getDoc(doc: object, prop: string) {
  let result = "";
  for (const key in doc) {
    if (doc[key].toString().startsWith(`@${prop}`)) {
      result = doc[key].replace(`@${prop}`, "").trim();
      break;
    }
  }
  return result;
}

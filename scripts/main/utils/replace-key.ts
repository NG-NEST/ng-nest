import { isObject } from "util";
import { NcPage } from "../interfaces/page";

/**
 * 替换关键字为指定内容
 *
 * @export
 * @param {string} content
 * @param {string} key
 * @param {string} value
 * @returns
 */
export function replaceKey(content: string, key: string, value: string) {
  return content.replace(new RegExp(`{{ ${key} }}`, "g"), value);
}

/**
 * 替换根据页面控件
 *
 * @export
 * @param {(NcPage | any)} page
 * @param {string} prefix
 * @param {string} template
 * @returns {string}
 */
export function replaceKeyByPage(page: NcPage | any, prefix: string, template: string): string {
  for (let key in page) {
    template = replaceKey(template, `${prefix}${key}`, page[key]);
  }
  return template;
}

/**
 * 替换根据JSON对象
 *
 * @export
 * @param {string} content
 * @param {*} object
 * @param {string} [prefix=""]
 * @returns
 */
export function replaceKeyByObject(content: string, object: any, prefix: string = "") {
  if (!isObject(object)) {
    return content;
  }
  for (let key in object) {
    content = replaceKey(content, `${prefix}${key}`, object[key]);
  }
  return content;
}

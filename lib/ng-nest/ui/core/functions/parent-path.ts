/**
 * @zh_CN 获取元素的父节点路径
 * @en_US The parent node of the element
 */
export function XParentPath(ele: HTMLElement): string[] {
  let path: string[] = [];
  let nowEle = ele;
  while (nowEle.parentNode != null) {
    path.push(nowEle.localName);
    nowEle = nowEle.parentNode as HTMLElement;
  }
  return path;
}

/**
 * @zh_CN 获取元素的父元素路径
 * @en_US The parent element path of obtaining elements
 */
export function XParents(ele: HTMLElement): HTMLElement[] {
  let res: HTMLElement[] = [];
  let nowEle = ele;
  while (nowEle.parentElement != null) {
    res.push(nowEle.parentElement!);
    nowEle = nowEle.parentNode as HTMLElement;
  }
  return res;
}

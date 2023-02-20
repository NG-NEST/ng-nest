export function XParentPath(ele: HTMLElement): string[] {
  let path: string[] = [];
  let nowEle = ele;
  while (nowEle.parentNode != null) {
    path.push(nowEle.localName);
    nowEle = nowEle.parentNode as HTMLElement;
  }
  return path;
}

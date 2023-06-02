export function XParentPath(ele: HTMLElement): string[] {
  let path: string[] = [];
  let nowEle = ele;
  while (nowEle.parentNode != null) {
    path.push(nowEle.localName);
    nowEle = nowEle.parentNode as HTMLElement;
  }
  return path;
}

export function XParents(ele: HTMLElement): HTMLElement[] {
  let res: HTMLElement[] = [];
  let nowEle = ele;
  while (nowEle.parentElement != null) {
    res.push(nowEle.parentElement!);
    nowEle = nowEle.parentNode as HTMLElement;
  }
  return res;
}

/**
 * @zh_CN 删除当前标签，保留内容
 * @en_US Delete the current label and keep the content
 */
export function XRemoveNgTag(nativeElement: HTMLElement): void {
  const parentElement = nativeElement.parentElement;
  if (!parentElement || !parentElement.insertBefore) return;
  while (nativeElement.firstChild) {
    parentElement.insertBefore(nativeElement.firstChild, nativeElement);
  }
  parentElement.removeChild(nativeElement);
}

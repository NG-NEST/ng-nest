/**
 * 删除当前标签，保留内容
 */
export function removeNgTag(nativeElement: HTMLElement): void {
  const parentElement = nativeElement.parentElement;
  if (!parentElement || !parentElement.insertBefore) return;
  while (nativeElement.firstChild) {
    parentElement.insertBefore(nativeElement.firstChild, nativeElement);
  }
  parentElement.removeChild(nativeElement);
}

import { Observable, Subscriber } from 'rxjs';

/**
 * @zh_CN 监听元素大小边界尺寸的变化
 * @en_US Monitoring elements of the size of the boundary size
 */
export type XResizeObserver = ResizeObserver | null;

/**
 * @zh_CN ResizeObserver 回调函数参数的对象
 * @en_US Object of ResizeobServer's callback function parameter
 */
export type XResizeObserverEntry = ResizeObserverEntry | null;

/**
 * @zh_CN 这个函数的功能是创建一个Observable，用于监听多个元素的尺寸变化
 * @en_US The function of this function is to create an Observable to monitor the size changes of multiple elements.
 */
export function XResize(
  ...element: Element[]
): Observable<{ entry: XResizeObserverEntry; resizeObserver: XResizeObserver }> {
  return new Observable(
    (
      x: Subscriber<{
        entry: XResizeObserverEntry;
        resizeObserver: XResizeObserver;
      }>
    ) => {
      if (typeof ResizeObserver !== 'function') {
        return;
      }
      const resizeObserver = new ResizeObserver((entries: XResizeObserverEntry[]) => {
        for (const entry of entries) {
          x.next({ entry: entry, resizeObserver: resizeObserver });
        }
      });
      for (let ele of element) {
        if (ele) resizeObserver.observe(ele);
      }
    }
  );
}

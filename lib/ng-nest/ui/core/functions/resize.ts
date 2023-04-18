import { Observable, Subscriber } from 'rxjs';

export type XResizeObserver = ResizeObserver | null;
export type XResizeObserverEntry = ResizeObserverEntry | null;

export const XResize = (...element: Element[]): Observable<{ entry: XResizeObserverEntry; resizeObserver: XResizeObserver }> => {
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

      //XResize 取消订阅的时候自动销毁
      //resizeObserver.disconnect();
    }
  );
};

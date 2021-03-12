import ResizeObserver from 'resize-observer-polyfill';
import { Observable, Subscriber } from 'rxjs';

export const XResize = (...element: Element[]): Observable<{ entry: ResizeObserverEntry; resizeObserver: ResizeObserver }> => {
  return new Observable(
    (
      x: Subscriber<{
        entry: ResizeObserverEntry;
        resizeObserver: ResizeObserver;
      }>
    ) => {
      const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
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

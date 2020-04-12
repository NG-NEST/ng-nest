import ResizeObserver from 'resize-observer-polyfill';
import { Observable } from 'rxjs';

export const XResize = (...element: Element[]): Observable<{ entry: ResizeObserverEntry; resizeObserver: ResizeObserver }> => {
  return new Observable((x) => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        x.next({ entry: entry, resizeObserver: resizeObserver });
      }
    });
    for (let ele of element) {
      resizeObserver.observe(ele);
    }

    //XResize 取消订阅的时候自动销毁
    //resizeObserver.disconnect();
  });
};

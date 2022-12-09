import { Injectable, Optional, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { XHasIn } from '@ng-nest/ui/core';
import { XIconPrefix } from './icon.property';

type Task<T> = {
  name: string;
  observable: Observable<T>;
  callback: Function;
};

// @dynamic
@Injectable()
export class XIconService {
  rootUrl = `https://ngnest.com/static/icons/`;
  caches: { [property: string]: any } = {};
  queue: Task<any>[] = [];
  activeTaskXm: number = 0;
  isRunningTask = false;
  limit: number = 10;

  constructor(private sanitizer: DomSanitizer, @Optional() private http: HttpClient) {
    if (!http) {
      throw new Error(`${XIconPrefix}: Not found 'HttpClient', You can import 'HttpClientModule' in your root module.`);
    }
  }

  public addTask<T>(task: Task<T>) {
    this.queue.push(task);
    this.runTask();
  }

  private execute<T>(task: Task<T>) {
    this.isRunningTask = true;
    if (XHasIn(this.caches, task.name)) {
      task.callback(this.caches[task.name]);
      this.activeTaskXm--;
      this.isRunningTask = false;
      this.runTask();
      return;
    }
    return task.observable.subscribe(
      (result) => {
        this.caches[task.name] = result;
        task.callback(result);
        return result;
      },
      (error) => {
        console.error(error);
        this.activeTaskXm--;
        this.isRunningTask = false;
        this.runTask();
      },
      () => {
        this.activeTaskXm--;
        this.isRunningTask = false;
        this.runTask();
      }
    );
  }

  private runTask() {
    if (!this.isRunningTask && this.activeTaskXm < this.limit && this.queue.length > 0) {
      const task = this.queue.shift();
      this.activeTaskXm++;
      this.execute(task!);
    }
  }

  getSvgs(...icons: string[]): Observable<string[]> {
    return Observable.create((subscriber: Subscriber<string[]>) => {
      let result: string[] = [];
      icons.forEach((icon, index) =>
        this.addTask({
          name: icon,
          observable: this.getSvgElement(icon),
          callback: (svg: string) => {
            result.push(svg);
            if (index === icons.length - 1) {
              subscriber.next(result);
              subscriber.complete();
            }
          }
        })
      );
    });
  }

  getSvgElement(icon: string): Observable<string> {
    const url = `${this.rootUrl}${icon}.svg`;
    const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
    return this.http.get(safeUrl as string, { responseType: 'text' });
  }
}

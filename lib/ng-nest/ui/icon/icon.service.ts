import { Injectable, SecurityContext, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { XHasIn, XIsEmpty } from '@ng-nest/ui/core';
import { XIconPrefix } from './icon.property';

type Task<T> = {
  name: string;
  observable: Observable<T>;
  callback: Function;
};

@Injectable({ providedIn: 'root' })
export class XIconService {
  caches: { [property: string]: any } = {};
  queue: Task<any>[] = [];
  activeTaskXm: number = 0;
  isRunningTask = false;
  limit: number = 10;
  sanitizer = inject(DomSanitizer);
  http = inject(HttpClient, { optional: true })!;
  customIcon: { [property: string]: string } = {};

  constructor() {
    if (!this.http) {
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
    return task.observable.subscribe({
      next: (result) => {
        this.caches[task.name] = result;
        task.callback(result);
        return result;
      },
      error: (error) => {
        console.error(error);
        this.activeTaskXm--;
        this.isRunningTask = false;
        this.runTask();
      },
      complete: () => {
        this.activeTaskXm--;
        this.isRunningTask = false;
        this.runTask();
      }
    });
  }

  private runTask() {
    if (!this.isRunningTask && this.activeTaskXm < this.limit && this.queue.length > 0) {
      const task = this.queue.shift();
      this.activeTaskXm++;
      this.execute(task!);
    }
  }

  getSvg(root: string, icon: string, isCustom = false): Observable<string> {
    return new Observable((subscriber: Subscriber<string>) => {
      if (XIsEmpty(icon)) {
        subscriber.next('');
        subscriber.complete();
        return;
      }
      this.addTask({
        name: icon,
        observable: this.getSvgElement(root, icon, isCustom),
        callback: (svg: string) => {
          subscriber.next(svg);
          subscriber.complete();
        }
      });
    });
  }

  getSvgElement(root: string, icon: string, isCustom = false): Observable<string> {
    const url = isCustom ? `${root}${icon}` : `${root}${icon}.svg`;
    const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
    return this.http.get(safeUrl as string, { responseType: 'text' });
  }

  register(icon: string, url: string) {
    this.customIcon[icon] = url;
  }
}

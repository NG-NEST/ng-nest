import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class XHttpService {
  api: string = '';
  constructor(public http: HttpClient) {}

  get(url: string, params?: { [property: string]: any }) {
    return this.request('GET', url, params);
  }

  post(url: string, params?: { [property: string]: any }): Observable<any> {
    return this.request('POST', url, params);
  }

  put(url: string, params?: { [property: string]: any }): Observable<any> {
    return this.request('PUT', url, params);
  }

  delete(url: string, params?: { [property: string]: any }): Observable<any> {
    return this.request('DELETE', url, params);
  }

  request(
    method: string,
    url: string,
    params?: { [property: string]: any },
    option?: { [property: string]: any }
  ): Observable<any> {
    if (!option) option = {};
    let opt = {};
    url = `${this.api}${url}`;
    method = method.toUpperCase();
    if (['POST', 'PUT', 'DELETE'].indexOf(method) > -1) {
      opt = { body: params, observe: 'body', responseType: 'json' };
    } else if (['GET'].indexOf(method) > -1) {
      opt = { params: params };
    }
    Object.assign(opt, option);
    return new Observable((x) => {
      this.http.request(method, url, opt).subscribe(
        (y: any) => {
          x.next(y);
          x.complete();
        },
        (y) => {
          x.error(y);
          x.complete();
          this.handleError(y);
        }
      );
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.error) {
    }
    return throwError(error.error);
  }
}

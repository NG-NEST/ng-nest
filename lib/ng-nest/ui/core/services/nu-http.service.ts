import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

// @dynamic
@Injectable({ providedIn: "root" })
export class NuHttpService {
  api: string = "";
  constructor(public http: HttpClient) {}

  /**
   * get请求
   */
  get(url: string, params?, isBody?) {
    return this.request("GET", url, params, isBody);
  }

  /**
   * get请求
   */
  post(url: string, params?): Observable<any> {
    return this.request("POST", url, params);
  }

  /**
   * put请求
   */
  put(url: string, params?): Observable<any> {
    return this.request("PUT", url, params);
  }

  /**
   * delete请求
   */
  delete(url: string, params?): Observable<any> {
    return this.request("DELETE", url, params);
  }

  /**
   * request通用请求
   */
  request(method: string, url: string, params?, isBody = false): Observable<any> {
    let option = {};
    url = `${this.api}${url}`;
    method = method.toUpperCase();
    if (["POST", "PUT", "DELETE"].indexOf(method) > -1 || isBody) {
      option = { body: params, observe: "body", responseType: "json" };
    } else if (["GET"].indexOf(method) > -1) {
      option = { params: params };
    }
    this.addHeader(option);
    return Observable.create(x => {
      this.http.request(method, url, option).subscribe(
        (y: any) => {
          x.next(y);
          x.complete();
        },
        y => {
          x.error(y);
          x.complete();
          this.handleError(y);
        }
      );
    });
  }

  /**
   * 错误处理
   */
  handleError(error: HttpErrorResponse) {
    if (error.error) {
    }
    return throwError(error.error);
  }

  /**
   * 添加头部信息
   */
  private addHeader(option) {
    // let auth = this.setting.getSession("Auth");
    // if (auth && auth["token"]) {
    //   option["headers"] = { Authorization: `Bearer ${auth["token"]}` };
    // }
  }
}

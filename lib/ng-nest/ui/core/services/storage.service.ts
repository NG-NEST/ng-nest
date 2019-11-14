import { Injectable } from "@angular/core";

// @dynamic
@Injectable({ providedIn: "root" })
export class XStorageService {
  constructor() {}

  /**
   * 获取本地值
   */
  getLocal(key: string) {
    return JSON.parse(localStorage.getItem(key) || "null") || null;
  }

  /**
   * 设置本地值
   */
  setLocal(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 获取当前会话的值
   */
  getSession(key: string) {
    return JSON.parse(sessionStorage.getItem(key) || "null") || null;
  }

  /**
   * 设置当前会话值
   */
  setSession(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 移除本地值
   */
  removeLocal(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * 移除当前会话
   */
  removeSession(key: string) {
    sessionStorage.removeItem(key);
  }

  /**
   * 生成guid
   */
  guid() {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }
}

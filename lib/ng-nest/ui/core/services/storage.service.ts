import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

// @dynamic
@Injectable({ providedIn: 'root' })
export class XStorageService {
  constructor(private platform: Platform) {}

  /**
   * 获取本地值
   */
  getLocal(key: string) {
    if (this.platform.isBrowser) {
      let str = localStorage.getItem(key);
      try {
        return JSON.parse(localStorage.getItem(key) || 'null') || null;
      } catch (_e) {
        return str;
      }
    } else {
      return null;
    }
  }

  /**
   * 设置本地值
   */
  setLocal(key: string, value: any) {
    if (this.platform.isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * 获取当前会话的值
   */
  getSession(key: string) {
    if (this.platform.isBrowser) {
      let str = localStorage.getItem(key);
      try {
        return JSON.parse(sessionStorage.getItem(key) || 'null') || null;
      } catch (_e) {
        return str;
      }
    } else {
      return null;
    }
  }

  /**
   * 设置当前会话值
   */
  setSession(key: string, value: any) {
    if (this.platform.isBrowser) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * 移除本地值
   */
  removeLocal(key: string) {
    if (this.platform.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  /**
   * 移除当前会话
   */
  removeSession(key: string) {
    if (this.platform.isBrowser) {
      sessionStorage.removeItem(key);
    }
  }

  /**
   * 生成guid
   */
  guid() {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  }
}

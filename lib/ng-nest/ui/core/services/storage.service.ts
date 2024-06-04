import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { XIsString } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class XStorageService {
  constructor(private platform: Platform) {}

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

  setLocal(key: string, value: any) {
    if (this.platform.isBrowser) {
      if (XIsString(value)) {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }

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

  setSession(key: string, value: any) {
    if (this.platform.isBrowser) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  removeLocal(key: string) {
    if (this.platform.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  removeSession(key: string) {
    if (this.platform.isBrowser) {
      sessionStorage.removeItem(key);
    }
  }

  guid() {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  }
}

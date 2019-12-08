import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class ConfigService {
  constructor() {}

  init() {
    // this.setLang();
  }

  setLang() {
    if (!environment.production) return;
    if (["/en/", "/zh/"].indexOf(location.pathname) > -1) {
      localStorage.setItem("Lang", location.pathname.replace(/\//g, ""));
      return;
    }
    let lang = localStorage.getItem("Lang");
    if (!lang) {
      localStorage.setItem("Lang", "en");
      location.href = `${location.origin}/en`;
    } else {
      location.href = `${location.origin}/${lang}`;
    }
  }
}

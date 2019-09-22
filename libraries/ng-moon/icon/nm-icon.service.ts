import { Injectable, SecurityContext, Optional, Inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { warnSVGTagNotFound } from "ng-moon/core";
import { DOCUMENT } from "@angular/common";

// @dynamic
@Injectable({ providedIn: "root" })
export class NmIconService {
  rootUrl = `http://www.ng-nest.com/assets/icons/`;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    @Optional() @Inject(DOCUMENT) private document: any
  ) {}

  getSvgElement(icon: string): Observable<SVGElement> {
    const url = `${this.rootUrl}${icon}.svg`;
    const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
    return this.http.get(safeUrl, { responseType: "text" }).pipe(
      map(x => {
        const div = this.document.createElement("div");
        div.innerHTML = x.replace(/(<[svg\s\/>]+)\b[^>]*>/gi, "$1>");
        const svg: SVGElement = div.querySelector("svg");
        if (!svg) {
          warnSVGTagNotFound();
        }
        return svg;
      })
    );
  }
}

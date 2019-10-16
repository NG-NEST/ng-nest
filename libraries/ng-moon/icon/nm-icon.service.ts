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
  rootUrl = `http://localhost/assets/icons/`;

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
        const svg = this.document.createElement("svg");
        div.innerHTML = x;
        svg.innerHTML = div.querySelector("svg").innerHTML;
        if (!svg) {
          warnSVGTagNotFound();
        }
        return svg;
      })
    );
  }
}

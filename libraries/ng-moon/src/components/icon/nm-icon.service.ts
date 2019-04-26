import { Injectable, SecurityContext, Optional, Inject } from "@angular/core";
import { DomSanitizer, DOCUMENT } from "@angular/platform-browser";
import { Log } from "../../core/util/log";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class NmIconService {
  rootUrl = `https://raw.githubusercontent.com/NG-NEST/ng-moon/master/src/assets/icons/`;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    @Optional() @Inject(DOCUMENT) private document: Document
  ) {}

  getSvgElement(icon: string): Observable<SVGElement> {
    const url = `${this.rootUrl}${icon}.svg`;
    const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
    if (!safeUrl) Log.UrlNotSafeError(safeUrl);
    return this.http.get(safeUrl, { responseType: "text" }).pipe(
      map(x => {
        const div = this.document.createElement("div");
        div.innerHTML = x.replace(/(<[svg\s\/>]+)\b[^>]*>/gi, "$1>");
        const svg: SVGElement = div.querySelector("svg");
        if (!svg) {
          throw Log.SVGTagNotFoundWarn();
        }
        return svg;
      })
    );
  }
}

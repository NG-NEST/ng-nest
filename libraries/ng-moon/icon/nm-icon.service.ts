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
        const svg = this.document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        ) as SVGAElement;
        const div = this.document.createElement("div");
        div.innerHTML = x;
        let svgEle = div.querySelector("svg") as SVGElement;
        let eles = svgEle.querySelectorAll(
          "path, polyline, polygon, circle, line, rect"
        );
        console.log(eles);
        if (eles.length == 0) {
          debugger;
        }
        eles.forEach(x => {
          svg.appendChild(x);
        });
        this.setAttribute(svg, svgEle, "viewBox");
        this.setAttribute(svg, svgEle, "fill", "currentColor");
        this.setAttribute(svg, svgEle, "stroke");
        this.setAttribute(svg, svgEle, "stroke-width");
        this.setAttribute(svg, svgEle, "stroke-linecap");
        this.setAttribute(svg, svgEle, "stroke-linejoin");
        if (!svg) {
          warnSVGTagNotFound();
        }
        return svg;
      })
    );
  }

  setAttribute(
    svg: SVGElement,
    svgEle: SVGElement,
    attribute: string,
    def?: string
  ) {
    let attr = svgEle.getAttribute(attribute);
    if (attr) {
      svg.setAttribute(attribute, attr);
    } else if (def) {
      svg.setAttribute(attribute, def);
    }
  }
}

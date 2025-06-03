import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  HostBinding,
  inject,
  effect,
  computed,
  ChangeDetectorRef
} from '@angular/core';
import { XIconPrefix, XIconProperty } from './icon.property';
import { XIconService } from './icon.service';
import { XWarnIconTypeNotFound, XIsEmpty, XHasIn, XWarnSVGTagNotFound } from '@ng-nest/ui/core';
import { DOCUMENT } from '@angular/common';

// 来源路径对应
export const XSouceUrl: { [property: string]: string } = {
  adf: `ant-design/fill/`,
  ado: `ant-design/outline/`,
  adt: `ant-design/twotone/`,
  eaf: `eva/fill/`,
  eao: `eva/outline/`,
  fto: `feather/`,
  fab: `font-awesome/brands/`,
  far: `font-awesome/regular/`,
  fas: `font-awesome/solid/`,
  mdf: `material-design/fill/`,
  mdo: `material-design/outline/`
};

export const XViewBox = [
  // { souces: ["adf", "ado", "adt"], value: "0 0 1024 1024" },
  // { souces: ["eaf", "eao"], value: "0 0 24 24" },
  // { souces: ["fto"], value: "0 0 24 24" }
];

@Component({
  selector: `${XIconPrefix}`,
  templateUrl: './icon.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XIconComponent extends XIconProperty {
  @HostBinding('class') get className() {
    return `${XIconPrefix} ${this.type()}`;
  }
  private svgElement!: HTMLElement;
  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);
  private iconService = inject(XIconService);

  @HostBinding('class.x-icon-spin') get getSpin() {
    return this.spin();
  }

  @HostBinding('style.color') get getColor() {
    return this.color();
  }

  inSource = computed(() => {
    const type = this.type();
    if (typeof type === 'undefined' || type === '' || type === null) return false;
    const split = type.split('-');
    const souce = split.shift();
    if (typeof souce === 'undefined') return false;
    const souceUrl = XSouceUrl[souce];
    return souceUrl ? true : false;
  });

  sourceUrl = computed(() => {
    if (!this.inSource()) return '';
    const split = this.type()!.split('-');
    const souce = split.shift();
    const souceUrl = XSouceUrl[souce!];
    const fileName = split.join('-');
    if (!souceUrl || !fileName) {
      XWarnIconTypeNotFound();
    }
    return `${souceUrl}${fileName}`;
  });

  isCustom = computed(() => {
    return !this.inSource() && XHasIn(this.iconService.customIcon, this.type()!);
  });

  constructor() {
    super();
    effect(() => {
      if (this.isCustom()) {
        this.iconService.getSvg('', this.iconService.customIcon[this.type()!], true).subscribe((x) => this.setSvgs(x));
      } else if (this.inSource()) {
        this.iconService.getSvg(this.href(), this.sourceUrl()).subscribe((x) => this.setSvgs(x));
      }
    });
  }

  setSvgs(svg: string) {
    if (XIsEmpty(svg)) return;
    if (this.svgElement) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.svgElement);
    }
    if (this.isCustom()) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
      let firstChild = this.elementRef.nativeElement.firstChild;
      if (firstChild) {
        this.renderer.removeChild(this.elementRef.nativeElement, firstChild);
      }
      this.svgElement = svgDoc.documentElement;
    } else if (this.inSource()) {
      this.svgElement = this.buildSvg(svg)!;
    }
    if (!this.svgElement) return;
    this.setAttributes(this.svgElement);
    this.renderer.appendChild(this.elementRef.nativeElement, this.svgElement);
    // TODO: use zoneless, renderer removeChild will not take effect immediately
    this.cdr.markForCheck();
  }

  buildSvg(svgStr: string): HTMLElement | undefined {
    const result = this.document.createElementNS('http://www.w3.org/2000/svg', 'svg') as any;
    const svg = this.createSvg(svgStr);
    if (!svg) return;
    svg.children.forEach((x) => {
      x.removeAttribute('class');
      if (x.tagName === 'rect') {
        x.setAttribute('fill', 'none');
      }
      result.appendChild(x);
    });
    this.setAttribute(result, svg.ele, 'viewBox');
    this.setAttribute(result, svg.ele, 'fill', 'currentColor');
    this.setAttribute(result, svg.ele, 'stroke');
    this.setAttribute(result, svg.ele, 'stroke-width');
    this.setAttribute(result, svg.ele, 'stroke-linecap');
    this.setAttribute(result, svg.ele, 'stroke-linejoin');
    if (!result) {
      XWarnSVGTagNotFound();
    }

    return result;
  }

  createSvg(svgStr: string) {
    const div = this.document.createElement('div');
    div.innerHTML = svgStr;
    let svgEle = div.querySelector('svg') as SVGElement;
    if (!svgEle) return null;
    return {
      ele: svgEle,
      children: svgEle.querySelectorAll('path, polyline, polygon, circle, line, rect')
    };
  }

  setAttributes(svgEle: HTMLElement) {
    if (svgEle) {
      this.renderer.setAttribute(svgEle, 'width', '1em');
      this.renderer.setAttribute(svgEle, 'height', '1em');
    }
  }

  setAttribute(svg: SVGElement, svgEle: SVGElement, attribute: string, def?: string) {
    let attr = svgEle.getAttribute(attribute);
    if (attr) {
      svg.setAttribute(attribute, attr);
    } else if (def) {
      svg.setAttribute(attribute, def);
    }
  }
}

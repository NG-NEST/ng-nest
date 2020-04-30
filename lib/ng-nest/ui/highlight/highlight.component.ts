import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  OnChanges,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import { XHighlightPrefix, XHighlightProperty } from './highlight.property';
import { XIsChange, XIsEmpty } from '@ng-nest/ui/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare let Prism: any;

@Component({
  selector: `${XHighlightPrefix}`,
  templateUrl: './highlight.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHighlightComponent extends XHighlightProperty implements OnChanges {
  @ViewChild('code', { static: false }) codeRef: ElementRef;

  display: SafeHtml;
  lines: string[] = [];
  lineHeight = 1.1875;

  constructor(public elementRef: ElementRef, public renderer: Renderer2, public cdr: ChangeDetectorRef, public sanitizer: DomSanitizer) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XHighlightPrefix);
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  setData(): void {
    if (XIsEmpty(this.type)) return;
    if (XIsEmpty(this.data)) this.data = '';
    if (Prism?.languages?.[this.type]) {
      this.lines = this.data.split(/\n(?!$)/g);
      this.display = this.sanitizer.bypassSecurityTrustHtml(
        Prism.highlight(this.data, Prism.languages[this.type], this.type) + this.createLineNumbers() + this.createHighlightLines()
      );
    } else {
      console.warn(
        `x-highlight: [${this.type}] file are not supported, the prismjs plugin is used for highlight, so configure the introduction in angular.json.`
      );
      this.display = this.sanitizer.bypassSecurityTrustHtml(this.data);
    }
    this.cdr.detectChanges();
  }

  createLineNumbers() {
    let result = '';
    if (this.lines?.length > 0) {
      result = `<span class="line-numbers">${new Array(this.lines.length + 1).join('<span></span>')}</span>`;
    }
    return result;
  }

  createHighlightLines() {
    let result = '';
    for (const key in this.highlightLines) {
      const spt = this.highlightLines[key].split(',');
      for (const st of spt) {
        const sp = st.split('-');
        const top = this.lineHeight * (Number(sp[0]) - 1);
        let height = this.lineHeight * (sp.length === 2 ? Number(sp[1]) - Number(sp[0]) + 1 : 1);
        result += `<div class="line-highlight ${key}" style="top: ${top}rem; height: ${height}rem"></div>`;
      }
    }

    return result;
  }
}

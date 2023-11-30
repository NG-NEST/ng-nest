import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  OnChanges,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
  inject,
  PLATFORM_ID,
  OnInit
} from '@angular/core';
import { XHighlightPrefix, XHighlightProperty } from './highlight.property';
import { XIsChange, XIsEmpty } from '@ng-nest/ui/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { delay, of } from 'rxjs';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: `${XHighlightPrefix}`,
  standalone: true,
  imports: [CommonModule, XButtonComponent],
  templateUrl: './highlight.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHighlightComponent extends XHighlightProperty implements OnInit, OnChanges {
  @ViewChild('code') codeRef!: ElementRef<HTMLElement>;

  display!: SafeHtml;
  lines: string[] = [];
  lineHeight = 1.1875;
  iconCopy = 'fto-copy';

  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  prism = this.isBrowser ? (window as any)['Prism'] : null;
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, XHighlightPrefix);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  setData(): void {
    if (XIsEmpty(this.type)) return;
    if (XIsEmpty(this.data)) this.data = '';
    if (!this.prism && this.isBrowser) {
      console.warn(
        `${XHighlightPrefix}: [${this.type}] file are not supported, the prismjs plugin is used for highlight, so configure the introduction in angular.json.`
      );
      this.display = this.sanitizer.bypassSecurityTrustHtml(this.data as string);
      return;
    }
    if (this.prism?.languages?.[this.type as string]) {
      this.lines = (this.data as string).split(/\n(?!$)/g);
      this.display = this.sanitizer.bypassSecurityTrustHtml(
        this.prism?.highlight(this.data, this.prism?.languages[this.type as string], this.type) +
          this.createLineNumbers() +
          this.createHighlightLines()
      );
    }
    this.cdr.detectChanges();
  }

  createLineNumbers() {
    let result = '';
    if (this.lines?.length > 0) {
      result = `<span class="line-numbers">${new Array(this.lines.length + 1).join(
        '<span></span>'
      )}</span>`;
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

  onCopy() {
    navigator.clipboard.writeText(this.data as string).then(() => {
      this.iconCopy = 'fto-check';
      this.cdr.detectChanges();
      of(true)
        .pipe(delay(2000))
        .subscribe(() => {
          this.iconCopy = 'fto-copy';
          this.cdr.detectChanges();
        });
    });
  }
}

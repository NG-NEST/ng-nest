import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
  signal,
  computed,
  HostBinding
} from '@angular/core';
import { XHighlightPrefix, XHighlightProperty } from './highlight.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { delay, of } from 'rxjs';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XHighlightService } from './highlight.service';

@Component({
  selector: `${XHighlightPrefix}`,
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './highlight.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHighlightComponent extends XHighlightProperty {
  @ViewChild('code') codeRef!: ElementRef<HTMLElement>;
  @HostBinding('class.x-highlight') _has = true;

  lines: string[] = [];
  lineHeight = 1.375;
  iconCopy = signal('fto-copy');

  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  private sanitizer = inject(DomSanitizer);
  private highlight = inject(XHighlightService);
  display = computed(() => {
    const type = this.type();
    let data = this.data();
    if (XIsEmpty(type)) return;
    if (XIsEmpty(data)) data = '';
    if (!this.highlight.prism && this.isBrowser) {
      console.warn(
        `${XHighlightPrefix}: [${type}] file are not supported, the prismjs plugin is used for highlight, so configure the introduction in angular.json.`
      );
      return this.sanitizer.bypassSecurityTrustHtml(data!);
    }
    if (this.highlight.prism?.languages?.[type!]) {
      const lines = data!.split(/\n(?!$)/g);
      return this.sanitizer.bypassSecurityTrustHtml(
        this.highlight.prism?.highlight(data, this.highlight.prism.languages[type!], type) +
          this.createLineNumbers(lines) +
          this.createHighlightLines()
      );
    }
    return '';
  });

  createLineNumbers(lines: string[]) {
    let result = '';
    if (lines.length > 0) {
      result = `<span class="line-numbers">${new Array(lines.length + 1).join('<span></span>')}</span>`;
    }
    return result;
  }

  createHighlightLines() {
    let result = '';
    const lines = this.highlightLines();
    for (const key in lines) {
      const spt = (lines as any)[key].split(',');
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
    navigator.clipboard.writeText(this.data() as string).then(() => {
      this.iconCopy.set('fto-check');
      of(true)
        .pipe(delay(2000))
        .subscribe(() => {
          this.iconCopy.set('fto-copy');
        });
    });
  }
}

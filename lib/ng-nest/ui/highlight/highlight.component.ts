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
      this.display = this.sanitizer.bypassSecurityTrustHtml(Prism.highlight(this.data, Prism.languages[this.type], this.type));
    } else {
      console.warn(
        `x-highlight: [${this.type}] file are not supported, the prismjs plugin is used for highlight, so configure the introduction in angular.json.`
      );
      this.display = this.sanitizer.bypassSecurityTrustHtml(this.data);
    }
    this.cdr.detectChanges();
  }
}

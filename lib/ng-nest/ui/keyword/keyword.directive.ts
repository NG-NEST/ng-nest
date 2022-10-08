import { OnInit, Renderer2, ElementRef, Directive, OnDestroy, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { XConfigService, XIsArray, XIsChange, XIsString, XIsUndefined } from '@ng-nest/ui/core';
import { XKeywordPrefix, XKeywordProperty } from './keyword.property';

@Directive({
  selector: `[${XKeywordPrefix}]`
})
export class XKeywordDirective extends XKeywordProperty implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  private _unSub = new Subject<void>();

  constructor(private renderer: Renderer2, private elementRef: ElementRef, public configService: XConfigService) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngAfterViewInit() {
    this.setKeyword();
  }

  ngOnDestroy(): void {
    this._unSub.next();
    this._unSub.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { text } = changes;
    XIsChange(text) && this.setKeyword();
  }

  setKeyword() {
    if (XIsUndefined(this.text)) return;
    const hele = this.elementRef.nativeElement as HTMLElement;
    let textContent = hele.textContent;
    if (!textContent) return;
    let texts: string[] = [];
    if (XIsArray(this.text)) {
      texts = this.text as string[];
    } else if (XIsString(this.text)) {
      texts = [this.text as string];
    }
    const flags = this.caseSensitive ? 'g' : 'gi';
    for (let tx of texts) {
      const reg = new RegExp(tx, flags);
      textContent = textContent.replace(reg, (p1) => {
        return `<span class="x-keyword-text">${p1}</span>`;
      });
    }
    hele.innerHTML = textContent;
  }

  setClassMap() {
    if (!this.color) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XKeywordPrefix}-${this.type}`);
    }
  }
}

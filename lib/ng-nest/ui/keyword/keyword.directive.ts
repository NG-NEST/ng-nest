import { ElementRef, Directive, inject, effect, HostBinding, computed } from '@angular/core';
import { XIsArray, XIsString, XIsUndefined } from '@ng-nest/ui/core';
import { XKeywordPrefix, XKeywordProperty } from './keyword.property';

@Directive({
  selector: `[${XKeywordPrefix}]`,
  standalone: true
})
export class XKeywordDirective extends XKeywordProperty {
  private elementRef = inject(ElementRef);
  @HostBinding('class') get cls() {
    if (!this.color()) {
      return `${XKeywordPrefix}-${this.type()}`;
    }
    return '';
  }
  textContent = computed(() => {
    const text = this.text();
    if (XIsUndefined(this.text())) return;
    const hele = this.elementRef.nativeElement as HTMLElement;
    let textContent = hele.textContent;
    if (!textContent) return;
    let texts: string[] = [];
    if (XIsArray(text)) {
      texts = text;
    } else if (XIsString(text)) {
      texts = [text];
    }
    const flags = this.caseSensitive() ? 'g' : 'gi';
    for (let tx of texts) {
      const reg = new RegExp(tx, flags);
      textContent = textContent.replace(reg, (p1) => {
        return `<span class="x-keyword-text">${p1}</span>`;
      });
    }
    return textContent;
  });

  constructor() {
    super();
    effect(() => {
      if (!XIsUndefined(this.text())) {
        this.elementRef.nativeElement.innerHTML = this.textContent();
      }
    });
  }
}

import { Directive, inject, input, computed, effect, ElementRef } from '@angular/core';
import { XI18nService } from './i18n.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[x-i18n]',
  standalone: true
})
export class XI18nDirective {
  path = input('', { alias: 'x-i18n' });
  private locale = inject(XI18nService);
  private elementRef = inject(ElementRef<HTMLElement>);
  localeChanged = toSignal(this.locale.localeChange);

  content = computed(() => {
    if (this.path() && this.localeChanged()) {
      return this.locale.translate(this.path());
    }
    return '';
  });

  constructor() {
    effect(() => (this.elementRef.nativeElement.innerText = this.content()));
  }
}

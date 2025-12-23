import { Pipe, PipeTransform } from '@angular/core';
import { XI18nService } from './i18n.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Pipe({
  name: 'xI18n',
  pure: false
})
export class XI18nPipe implements PipeTransform {
  private lastKey?: string;
  private lastLang?: string;
  private lastValue?: string;

  locale = toSignal(this.i18n.localeChange);

  constructor(private i18n: XI18nService) {}

  transform(key: string, params?: object): string {
    const lang = this.locale()?.locale;

    if (key === this.lastKey && lang === this.lastLang) {
      return this.lastValue!;
    }

    this.lastKey = key;
    this.lastLang = lang;
    this.lastValue = this.i18n.translate(key, params);

    return this.lastValue;
  }
}

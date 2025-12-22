import { Pipe, PipeTransform } from '@angular/core';
import { XI18nService } from './i18n.service';

@Pipe({
  name: 'xI18n',
  pure: false
})
export class XI18nPipe implements PipeTransform {
  private lastKey?: string;
  private lastLang?: string;
  private lastValue?: string;

  constructor(private i18n: XI18nService) {}

  transform(key: string, params?: object): string {
    const lang = this.i18n.getLocaleId();

    if (key === this.lastKey && lang === this.lastLang) {
      return this.lastValue!;
    }

    this.lastKey = key;
    this.lastLang = lang;
    this.lastValue = this.i18n.translate(key, params);

    return this.lastValue;
  }
}

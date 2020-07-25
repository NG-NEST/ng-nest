import { Pipe, PipeTransform } from '@angular/core';
import { XI18nService } from './i18n.service';

@Pipe({
  name: 'xI18n',
  pure: false
})
export class XI18nPipe implements PipeTransform {
  private localeId: any;
  private catchContent: any;
  constructor(private locale: XI18nService) {}

  transform(path: string, keyValue?: object) {
    const localeId = this.locale.getLocaleId();
    const content = this.locale.translate(path, keyValue);
    if (this.localeId !== localeId || this.catchContent !== content) {
      this.catchContent = content;
      this.localeId = localeId;
    }

    return this.catchContent;
  }
}

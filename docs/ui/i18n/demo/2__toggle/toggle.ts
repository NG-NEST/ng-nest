import { en_US, XI18nService } from '@ng-nest/ui/i18n';
...
constructor(private i18n: XI18nService) { }

switchLanguage() {
  this.i18n.setLocale(en_US);
}
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { en_US, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'te-i18n',
  imports: [XEmptyComponent, FormsModule, XRadioComponent],
  templateUrl: './i18n.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeI18nComponent {
  i18n = inject(XI18nService);
  cdk = inject(ChangeDetectorRef);
  model = signal('zh_CN');

  L = this.i18n.L;
  change(value: any) {
    let lang: any = '';
    if (value === 'zh_CN') {
      lang = { ...zh_CN };
    } else if (value === 'en_US') {
      lang = { ...en_US };
    }
    this.i18n.setLocale(lang, true);
  }
}

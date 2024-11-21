import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { XPageHeaderPrefix, XPageHeaderProperty } from './page-header.property';
import { XI18nService, XI18nPageHeader, zh_CN } from '@ng-nest/ui/i18n';
import { map } from 'rxjs/operators';
import { XButtonComponent } from '@ng-nest/ui/button';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XPageHeaderPrefix}`,
  imports: [XButtonComponent],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPageHeaderComponent extends XPageHeaderProperty {
  private i18n = inject(XI18nService);
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.pageHeader as XI18nPageHeader)), {
    initialValue: zh_CN.pageHeader
  });

  backTextSignal = computed(() => this.backText() || this.locale().back);
}

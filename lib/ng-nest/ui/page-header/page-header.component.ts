import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XPageHeaderPrefix, XPageHeaderProperty } from './page-header.property';
import { XConfigService } from '@ng-nest/ui/core';
import { XI18nService, XI18nPageHeader } from '@ng-nest/ui/i18n';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: `${XPageHeaderPrefix}`,
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPageHeaderComponent extends XPageHeaderProperty {
  locale: XI18nPageHeader = {};
  private _unSubject = new Subject<void>();

  get getBackText() {
    return this.backText || this.locale.back;
  }

  constructor(public configService: XConfigService, public cdr: ChangeDetectorRef, public i18n: XI18nService) {
    super();
  }

  ngOnInit() {
    this.i18n.localeChange
      .pipe(
        map((x) => x.pageHeader as XI18nPageHeader),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngOnDestory() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }
}

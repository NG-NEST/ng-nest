import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { XPageHeaderPrefix, XPageHeaderProperty } from './page-header.property';
import { XConfigService } from '@ng-nest/ui/core';
import { XI18nService, XI18nPageHeader } from '@ng-nest/ui/i18n';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { XButtonComponent } from '@ng-nest/ui/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XPageHeaderPrefix}`,
  standalone: true,
  imports: [CommonModule, XButtonComponent],
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

  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(XI18nService);
  configService = inject(XConfigService);

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

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }
}

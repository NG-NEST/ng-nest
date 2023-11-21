import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { XEmptyPrefix, XEmptyProperty } from './empty.property';
import { XConfigService } from '@ng-nest/ui/core';
import { XI18nService } from '@ng-nest/ui/i18n';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XEmptyPrefix}`,
  standalone: true,
  imports: [CommonModule, XOutletDirective, XIconComponent, XI18nPipe, XEmptyProperty],
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XEmptyComponent extends XEmptyProperty {
  private _unSubject = new Subject<void>();

  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(XI18nService);
  configService = inject(XConfigService);

  ngOnInit() {
    this.i18n.localeChange
      .pipe(takeUntil(this._unSubject))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }
}

import { Renderer2, ElementRef, ChangeDetectorRef, Component, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { XPopconfirmProperty, XPopconfirmPrefix } from './popconfirm.property';
import { XBoolean, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XI18nService, XI18nPopconfirm } from '@ng-nest/ui/i18n';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XPopconfirmPrefix}`,
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPopconfirmComponent extends XPopconfirmProperty implements OnDestroy {
  visible!: XBoolean;
  locale: XI18nPopconfirm = {};
  loading = false;

  private _unSubject = new Subject<void>();
  private _asyncUnSub = new Subject<void>();

  get getCancelText() {
    return this.cancelText || this.locale.cancelText;
  }

  get getConfirmText() {
    return this.confirmText || this.locale.confirmText;
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService,
    public i18n: XI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.i18n.localeChange
      .pipe(
        map((x) => x.popconfirm as XI18nPopconfirm),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.complete();
  }

  onCancel() {
    this.visible = false;
    this.cancel.emit();
  }

  onConfirm() {
    if (this.confirmAsync) {
      this.loading = true;
      this.confirmAsync.pipe(takeUntil(this._asyncUnSub)).subscribe(() => {
        this.loading = false;
        this.visible = false;
        this.confirm.emit();
        this.cdr.detectChanges();
        this._asyncUnSub.next();
      });
    } else {
      this.visible = false;
      this.confirm.emit();
    }
  }

  onClick() {
    this.condition && this.onConfirm();
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnDestroy,
  inject,
  computed,
  signal
} from '@angular/core';
import { XPopconfirmProperty, XPopconfirmPrefix } from './popconfirm.property';
import { Subject } from 'rxjs';
import { XI18nService, XI18nPopconfirm, zh_CN } from '@ng-nest/ui/i18n';
import { map, takeUntil } from 'rxjs/operators';
import { XPopoverDirective } from '@ng-nest/ui/popover';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XPopconfirmPrefix}`,
  standalone: true,
  imports: [XPopoverDirective, XButtonComponent, XIconComponent, XOutletDirective],
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPopconfirmComponent extends XPopconfirmProperty implements OnDestroy {
  private i18n = inject(XI18nService);
  visible = signal(false);
  loading = signal(false);

  private asyncUnSub = new Subject<void>();

  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.popconfirm as XI18nPopconfirm)), {
    initialValue: zh_CN.popconfirm
  });

  cancelTextSignal = computed(() => this.cancelText() || this.locale().cancelText);
  confirmTextSignal = computed(() => this.confirmText() || this.locale().confirmText);

  ngOnDestroy(): void {
    this.asyncUnSub.next();
    this.asyncUnSub.complete();
  }

  onCancel(event: Event) {
    this.visible.set(false);
    this.cancel.emit(event);
  }

  onConfirm(event: Event) {
    const confirmAsync = this.confirmAsync();
    if (confirmAsync) {
      this.loading.set(true);
      confirmAsync.pipe(takeUntil(this.asyncUnSub)).subscribe(() => {
        this.loading.set(false);
        this.visible.set(false);
        this.confirm.emit(event);
        this.asyncUnSub.next();
      });
    } else {
      this.visible.set(false);
      this.confirm.emit(event);
    }
  }

  onClick(event: Event) {
    this.condition() && this.onConfirm(event);
  }
}

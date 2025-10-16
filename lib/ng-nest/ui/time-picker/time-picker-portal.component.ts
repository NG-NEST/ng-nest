import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
  DestroyRef
} from '@angular/core';
import {
  XTimePickerDisabledTime,
  XTimePickerPortalPrefix,
  XTimePickerPreset,
  XTimePickerType
} from './time-picker.property';
import { XPositionTopBottom } from '@ng-nest/ui/core';
import { map } from 'rxjs/operators';
import { XInputComponent } from '@ng-nest/ui/input';
import { XI18nService, XI18nTimePicker, zh_CN } from '@ng-nest/ui/i18n';
import { XTimePickerFrameComponent } from './time-picker-frame.component';
import { XButtonComponent } from '@ng-nest/ui/button';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XTimePickerPortalPrefix}`,
  imports: [XTimePickerFrameComponent, XButtonComponent],
  templateUrl: './time-picker-portal.component.html',
  styleUrls: ['./time-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTimePickerPortalComponent {
  private i18n = inject(XI18nService);
  @HostBinding('animate.enter') animateEnter = 'x-connect-enter';
  @HostBinding('animate.leave') animateLeave = 'x-connect-leave';

  @HostListener('animationend', ['$event']) done() {
    if (this.destroy()) return;
    this.animating.emit(false);
  }
  @HostListener('animationstart', ['$event']) start() {
    if (this.destroy()) return;
    this.animating.emit(true);
  }
  value = model<any>();
  type = input<XTimePickerType>('time');
  placement = input<XPositionTopBottom>();
  inputCom = input<XInputComponent>();
  use12Hours = input<boolean>();
  hourStep = input<number>();
  minuteStep = input<number>();
  secondStep = input<number>();
  preset = input<XTimePickerPreset[]>([]);
  disabledTime = input<XTimePickerDisabledTime>();
  animating = output<boolean>();
  nodeClick = output<Date>();
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.timePicker as XI18nTimePicker)), {
    initialValue: zh_CN.timePicker
  });
  destroy = signal(false);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
    });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  onPresetFunc(item: XTimePickerPreset) {
    let date = item.func();
    this.value.set(date);
    this.nodeClick.emit(date);
  }

  onNow() {
    let date = new Date();
    this.value.set(date);
    this.nodeClick.emit(date);
  }
}

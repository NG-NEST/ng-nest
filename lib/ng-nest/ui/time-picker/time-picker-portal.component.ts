import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  HostBinding,
  HostListener,
  inject
} from '@angular/core';
import {
  XTimePickerDisabledTime,
  XTimePickerPortalPrefix,
  XTimePickerPreset,
  XTimePickerType
} from './time-picker.property';
import { XBoolean, XConnectBaseAnimation, XPositionTopBottom } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { XInputComponent } from '@ng-nest/ui/input';
import { XI18nService, XI18nTimePicker } from '@ng-nest/ui/i18n';
import { XTimePickerFrameComponent } from './time-picker-frame.component';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: `${XTimePickerPortalPrefix}`,
  standalone: true,
  imports: [XTimePickerFrameComponent, XButtonComponent],
  templateUrl: './time-picker-portal.component.html',
  styleUrls: ['./time-picker-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XTimePickerPortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-base-animation') public placement!: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    this.animating(true);
  }
  type: XTimePickerType = 'time';
  value: any;
  valueChange!: Subject<any>;
  positionChange!: Subject<any>;
  closePortal!: Function;
  destroyPortal!: Function;
  animating!: Function;
  inputCom!: XInputComponent;
  use12Hours!: XBoolean;
  hourStep!: number;
  minuteStep!: number;
  secondStep!: number;
  preset: XTimePickerPreset[] = [];
  disabledTime!: XTimePickerDisabledTime;
  nodeEmit!: (date: Date) => void;
  locale: XI18nTimePicker = {};

  private _unSubject = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(XI18nService);

  ngOnInit(): void {
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x: any) => {
      this.value = x;
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
    this.i18n.localeChange
      .pipe(
        map((x) => x.timePicker as XI18nTimePicker),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  onPresetFunc(item: XTimePickerPreset) {
    let date = item.func();
    this.valueChange.next(date);
    this.nodeEmit(date);
  }

  onNow() {
    let date = new Date();
    this.valueChange.next(date);
    this.nodeEmit(date);
  }
}

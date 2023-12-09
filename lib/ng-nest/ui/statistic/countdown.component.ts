import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  NgZone,
  inject,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { XCountdownPrefix, XCountdownProperty } from './statistic.property';
import { interval, Subscription } from 'rxjs';
import { XConfigService } from '@ng-nest/ui/core';
import { isPlatformBrowser } from '@angular/common';
import { XTimeRangePipe } from '@ng-nest/ui/time-range';
import { XStatisticComponent } from './statistic.component';

@Component({
  selector: `${XCountdownPrefix}`,
  standalone: true,
  imports: [XStatisticComponent, XTimeRangePipe],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCountdownComponent extends XCountdownProperty implements OnInit, OnChanges, OnDestroy {
  diff!: number;
  period = 1000 / 30;
  private _target!: number;
  private _updater!: Subscription | null;
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  configService = inject(XConfigService);

  ngOnInit(): void {
    this.syncTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes;
    if (value) {
      this._target = Number(value.currentValue);
      if (!value.isFirstChange()) {
        this.syncTimer();
      }
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  syncTimer(): void {
    if (this._target >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer(): void {
    if (!this.isBrowser) return;
    this.ngZone.runOutsideAngular(() => {
      this.stopTimer();
      this._updater = interval(this.period).subscribe(() => {
        this.updateValue();
        this.cdr.detectChanges();
      });
    });
  }

  stopTimer(): void {
    if (this._updater) {
      this._updater.unsubscribe();
      this._updater = null;
    }
  }

  updateValue(): void {
    this.diff = Math.max(this._target - Date.now(), 0);
    if (this.diff === 0) {
      this.stopTimer();
      this.finish.emit();
    }
  }
}

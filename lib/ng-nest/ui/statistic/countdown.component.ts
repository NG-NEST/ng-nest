import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  NgZone,
  inject,
  PLATFORM_ID,
  OnDestroy,
  signal
} from '@angular/core';
import { XCountdownPrefix, XCountdownProperty } from './statistic.property';
import { interval, Subscription } from 'rxjs';
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
  diff = signal<number | string>('');
  period = 1000 / 30;
  private _target!: number;
  private updater!: Subscription | null;
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  private ngZone = inject(NgZone);

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
      this.updater = interval(this.period).subscribe(() => {
        this.updateValue();
      });
    });
  }

  stopTimer(): void {
    if (this.updater) {
      this.updater.unsubscribe();
      this.updater = null;
    }
  }

  updateValue(): void {
    this.diff.set(Math.max(this._target - Date.now(), 0));
    if (this.diff() === 0) {
      this.stopTimer();
      this.finish.emit();
    }
  }
}

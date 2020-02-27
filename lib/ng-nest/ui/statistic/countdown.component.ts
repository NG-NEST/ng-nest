import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  NgZone
} from "@angular/core";
import { XCountdownPrefix } from "./statistic.type";
import { XStatisticComponent } from "./statistic.component";
import { interval, Subscription } from "rxjs";
import { Platform } from "@angular/cdk/platform";

@Component({
  selector: `${XCountdownPrefix}`,
  templateUrl: "./countdown.component.html",
  styleUrls: ["./countdown.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCountdownComponent extends XStatisticComponent implements OnInit, OnChanges {
  @Input() format: string = "HH:mm:ss";
  @Output() readonly finish = new EventEmitter<void>();
  @ViewChild("countdown", { static: true }) countdown: ElementRef;
  diff: number;

  private target: number;
  private updater_: Subscription | null;
  period = 1000 / 30;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone, private platform: Platform) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.target = Number(changes.value.currentValue);
      if (!changes.value.isFirstChange()) {
        this.syncTimer();
      }
    }
  }

  ngOnInit(): void {
    this.syncTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  syncTimer(): void {
    if (this.target >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.stopTimer();
      this.updater_ = interval(this.period).subscribe(() => {
        this.updateValue();
        this.cdr.detectChanges();
      });
    });
  }

  stopTimer(): void {
    if (this.updater_) {
      this.updater_.unsubscribe();
      this.updater_ = null;
    }
  }

  /**
   * Update time that should be displayed on the screen.
   */
  protected updateValue(): void {
    this.diff = Math.max(this.target - Date.now(), 0);
    if (this.diff === 0) {
      this.stopTimer();
      this.finish.emit();
    }
  }
}

import { Subject, Subscription, distinctUntilChanged, fromEvent, interval, takeUntil } from 'rxjs';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  viewChild,
  signal,
  computed
} from '@angular/core';
import { XIsEmpty, XNumber, XIsNotNil, XIsFunction, XIsString } from '@ng-nest/ui/core';
import { XInputNumberPrefix, XInputNumberProperty } from './input-number.property';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XInputComponent } from '@ng-nest/ui/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: `${XInputNumberPrefix}`,
  imports: [FormsModule, ReactiveFormsModule, XInputComponent, XButtonComponent],
  templateUrl: './input-number.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XInputNumberComponent)]
})
export class XInputNumberComponent extends XInputNumberProperty {
  inputNumber = viewChild.required<ElementRef<HTMLElement>>('inputNumber');
  inputEleRef = viewChild.required<XInputComponent>('inputEleRef');

  displayValue = computed(() => {
    const value = this.value();
    const formatter = this.formatter();
    if (!XIsEmpty(value) && !formatter) {
      return Number(value).toFixed(this.precision());
    } else if (formatter) {
      const valueFormatter = formatter(Number(this.value()));
      const displayValue = XIsNotNil(valueFormatter) ? valueFormatter : '';
      if (XIsNotNil(displayValue)) {
        return displayValue;
      } else {
        return '';
      }
    }
    return '';
  });
  minDisabled = signal(false);
  maxDisabled = signal(false);
  mousedown$!: Subscription;
  mouseup$!: Subscription;
  timer: any;
  icon = signal('');
  iconSpin = signal(false);
  clearable = signal(false);
  isDown = signal(false);
  valueChange = new Subject<any>();

  document = inject(DOCUMENT);
  private unSubject = new Subject<void>();

  constructor() {
    super();
    this.valueChange.pipe(distinctUntilChanged(), takeUntil(this.unSubject)).subscribe((x) => {
      this.onChange && this.onChange(x);
    });
  }

  change(value: any) {
    this.verify(value);
    this.valueChange.next(this.value());
  }

  down(event: Event, limit: XNumber, increase: boolean = true): void {
    if (this.disabledComputed()) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDown.set(true);
    this.timer = setTimeout(() => {
      this.mousedown$ = interval(Number(this.debounce()))
        .pipe(takeUntil(this.unSubject))
        .subscribe(() => {
          this.plus(event, limit, increase);
        });
      this.mouseup$ = fromEvent(this.document.documentElement, 'mouseup')
        .pipe(takeUntil(this.unSubject))
        .subscribe((event: Event) => {
          this.up(event);
        });
    }, 150);
  }

  up(event: Event) {
    if (this.disabledComputed()) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDown.set(false);
    if (this.mousedown$) this.mousedown$.unsubscribe();
    if (this.mouseup$) this.mouseup$.unsubscribe();
  }

  plus(event: Event, limit: XNumber, increase: boolean = true) {
    if (this.disabledComputed()) return;
    limit = Number(limit);
    if (!increase) limit = -limit;
    event.preventDefault();
    event.stopPropagation();
    if (this.timer) clearTimeout(this.timer);
    if (Number.isNaN(+this.value())) this.value.set(0);
    let value = Number(this.value()) + limit;
    this.verify(value);
    this.valueChange.next(this.value());
  }

  verify(value: string | number) {
    if (XIsString(value) && Number(value).toString() !== value) {
      return;
    }
    value = Number(Number(value).toFixed(Number(this.precision())));
    const oldValue: number = this.value();
    this.value.set(value);
    if (Number.isNaN(+this.value())) {
      this.value.set(oldValue);
    } else {
      this.maxDisabled.set(value >= this.max());
      this.minDisabled.set(value <= this.min());
      this.value.set(this.maxDisabled() ? this.max() : this.minDisabled() ? this.min() : value);
    }
  }

  onInput(x: Event) {
    const input = x.target as HTMLInputElement;
    let value = input.value;
    if (XIsFunction(this.formatter)) {
      value = value.replace(/[^0-9]/g, '');
    }
    this.verify(value);
    this.inputEleRef().inputRef().nativeElement.value = this.displayValue();
    this.valueChange.next(this.value());
  }
}

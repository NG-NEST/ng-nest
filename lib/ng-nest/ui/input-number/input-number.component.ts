import { Subject, Subscription, debounceTime, distinctUntilChanged, fromEvent, interval, takeUntil } from 'rxjs';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  viewChild,
  signal
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

  displayValue = signal<string>('');
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

  inputValue = new Subject<string>();

  constructor() {
    super();
    this.valueChange.pipe(distinctUntilChanged(), takeUntil(this.unSubject)).subscribe((x) => {
      this.onChange && this.onChange(x);
    });

    this.inputValue.pipe(debounceTime(500), takeUntil(this.unSubject)).subscribe((value) => {
      if (XIsFunction(this.formatter())) {
        value = value.replace(/[^0-9]/g, '');
      }
      if (value === '') {
        this.value.set(null);
      } else {
        this.verify(Number(value));
        this.setDisplayValue(this.value());
      }
      this.valueChange.next(this.value());
    });
  }

  override writeValue(value: any): void {
    this.value.set(value);
    this.verify(Number(value));
    this.setDisplayValue(this.value());
  }

  ngOnInit() {
    this.setDisplayValue(this.value());
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
    this.setDisplayValue(value);
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
    this.inputValue.next(value);
  }

  setDisplayValue(value: string | number) {
    if (XIsEmpty(value)) {
      this.displayValue.set('');
      return;
    }
    let displayValue = '';
    const formatter = this.formatter();
    if (!XIsEmpty(value) && !formatter) {
      displayValue = Number(value).toFixed(this.precision());
    } else if (formatter) {
      const valueFormatter = formatter(Number(this.value()));
      const val = XIsNotNil(valueFormatter) ? valueFormatter : '';
      if (XIsNotNil(val)) {
        displayValue = val.toString();
      }
    }
    this.displayValue.set(displayValue);
  }
}

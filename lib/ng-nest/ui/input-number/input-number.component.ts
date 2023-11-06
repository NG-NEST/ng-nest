import { Subject, Subscription, distinctUntilChanged, fromEvent, interval } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import {
  XIsEmpty,
  XNumber,
  XClearClass,
  XConfigService,
  isNotNil,
  XIsFunction
} from '@ng-nest/ui/core';
import { XInputNumberPrefix, XInputNumberProperty } from './input-number.property';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { DOCUMENT } from '@angular/common';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: `${XInputNumberPrefix}`,
  templateUrl: './input-number.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XInputNumberComponent)]
})
export class XInputNumberComponent extends XInputNumberProperty implements OnInit {
  @ViewChild('inputNumber', { static: true }) inputNumber!: ElementRef<HTMLElement>;

  @ViewChild(XInputComponent, { static: true }) inputEleRef!: XInputComponent;

  override writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    this.cdr.detectChanges();
  }

  displayValue: any = '';
  minDisabled: boolean = false;
  maxDisabled: boolean = false;
  mousedown$!: Subscription;
  mouseup$!: Subscription;
  timer: any;
  icon: string = '';
  iconSpin = false;
  clearable = false;
  isDown = false;
  valueChange = new Subject<any>();

  document = inject(DOCUMENT);

  constructor(
    public renderer: Renderer2,
    public override cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setFlex(
      this.inputNumber.nativeElement,
      this.renderer,
      this.justify,
      this.align,
      this.direction
    );
    this.setClassMap();
    this.valueChange.pipe(distinctUntilChanged()).subscribe((x) => {
      this.onChange && this.onChange(x);
    });
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setDisplayValue() {
    if (!XIsEmpty(this.value) && !this.formatter) {
      this.displayValue = Number(this.value).toFixed(Number(this.precision));
    } else if (this.formatter) {
      const displayValue = isNotNil(this.formatter(Number(this.value)))
        ? this.formatter(Number(this.value))
        : '';
      if (isNotNil(displayValue)) {
        this.displayValue = displayValue;
      }
    }
  }

  change(value: any) {
    this.verify(value);
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  onBlur() {
    this.displayValue = this.displayValue;
    this.cdr.detectChanges();
  }

  down(event: Event, limit: XNumber, increase: boolean = true): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDown = true;
    this.timer = setTimeout(() => {
      this.mousedown$ = interval(Number(this.debounce)).subscribe(() => {
        this.plus(event, limit, increase);
      });
      this.mouseup$ = fromEvent(this.document.documentElement, 'mouseup').subscribe(
        (event: Event) => {
          this.up(event);
        }
      );
    }, 150);
  }

  up(event: Event) {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDown = false;
    if (this.mousedown$) this.mousedown$.unsubscribe();
    if (this.mouseup$) this.mouseup$.unsubscribe();
  }

  plus(event: Event, limit: XNumber, increase: boolean = true) {
    if (this.disabled) return;
    limit = Number(limit);
    if (!increase) limit = -limit;
    event.preventDefault();
    event.stopPropagation();
    if (this.timer) clearTimeout(this.timer);
    if (Number.isNaN(+this.value)) this.value = 0;
    let value = Number(this.value) + limit;
    this.verify(value);
    this.cdr.detectChanges();
    this.valueChange.next(this.value);
  }

  verify(value: any) {
    const oldValue: number = this.value;
    this.value = value;
    if (Number.isNaN(+this.value)) {
      this.value = oldValue;
      this.setDisplayValue();
      return;
    }
    this.maxDisabled = value >= this.max;
    this.minDisabled = value <= this.min;
    this.value = this.maxDisabled ? this.max : this.minDisabled ? this.min : value;
    this.setDisplayValue();
  }

  onInput(x: Event) {
    const input = x.target as HTMLInputElement;
    let value = input.value;
    if (XIsFunction(this.formatter)) {
      value = value.replace(/[^0-9]/g, '');
    }
    this.verify(value);
    this.inputEleRef.inputRef.nativeElement.value = this.displayValue;
    this.cdr.detectChanges();
    this.valueChange.next(this.value);
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}

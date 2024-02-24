import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  HostBinding,
  inject
} from '@angular/core';
import { XInputPrefix, XInputProperty } from './input.property';
import { XIsEmpty, XIsChange, XClearClass, XConfigService, XIsUndefined, XIsFunction } from '@ng-nest/ui/core';
import { Subject, distinctUntilChanged, fromEvent, takeUntil } from 'rxjs';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XInputGroupComponent } from './input-group.component';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XInputPrefix}`,
  standalone: true,
  imports: [NgClass, NgStyle, NgTemplateOutlet, FormsModule, ReactiveFormsModule, XIconComponent, XOutletDirective],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XInputComponent)]
})
export class XInputComponent extends XInputProperty implements OnInit, OnChanges {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef<HTMLElement>;
  @ViewChild('inputRef', { static: true }) inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('inputValueRef') inputValueRef!: ElementRef<HTMLElement>;
  @ViewChild('maxLengthRef') maxLengthRef!: ElementRef<HTMLElement>;

  @HostBinding('style.width.px') get getWidth() {
    return this.width;
  }

  override writeValue(value: any) {
    this.value = value;
    this.isWriteValue = true;
    this.valueChange.next(value);
    this.isWriteValue = false;
    this.cdr.detectChanges();
  }

  valueLength: number = 0;
  lengthTotal: string = '';
  paddingLeft: number = 0.75;
  paddingRight: number = 0.75;
  clearShow: boolean = false;
  flexClass: string[] = [];
  valueChange = new Subject<any>();
  isComposition = false;
  isWriteValue = false;
  private _required: boolean = false;
  private _unSubject = new Subject<void>();

  get getIcon() {
    return !XIsEmpty(this.icon);
  }

  get getIconLayoutLeft() {
    return !XIsEmpty(this.icon) && this.iconLayout === 'left';
  }

  get getIconLayoutRight() {
    return !XIsEmpty(this.icon) && this.iconLayout === 'right';
  }

  get getMaxLengthWidth() {
    if (this.getIconLayoutRight) {
      return this.paddingLeft;
    } else {
      return this.paddingRight;
    }
  }

  get beforeIsTemplate() {
    return this.before instanceof TemplateRef;
  }

  get afterIsTemplate() {
    return this.after instanceof TemplateRef;
  }

  get getTemplateWidth() {
    return `calc(100% - ${this.paddingLeft + this.paddingRight}rem)`;
  }

  focused = false;
  private renderer = inject(Renderer2);
  override cdr = inject(ChangeDetectorRef);
  private inputGroup = inject(XInputGroupComponent, { optional: true });
  elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setPadding();
    this.setFlexClass();
    this.setInheritedValue();
    this.setClassMap();
    this.setEvent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { clearable, size, labelAlign, justify, align, direction, icon, iconSpin, clearShow } = changes;
    XIsChange(clearable) && this.setClearable();
    XIsChange(size, labelAlign) && this.setClassMap();
    XIsChange(justify, align, direction) && this.setFlexClass();
    XIsChange(icon, iconSpin, clearShow) && this.cdr.detectChanges();
    XIsChange(size) && this.setPadding();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setEvent() {
    fromEvent(this.inputRef.nativeElement, 'compositionstart')
      .pipe(takeUntil(this._unSubject))
      .subscribe(() => {
        this.isComposition = true;
      });
    fromEvent(this.inputRef.nativeElement, 'compositionend')
      .pipe(takeUntil(this._unSubject))
      .subscribe((x: Event) => {
        this.isComposition = false;
        this.inputCheckValue(x);
      });
    fromEvent(this.inputRef.nativeElement, 'focus')
      .pipe(takeUntil(this._unSubject))
      .subscribe(() => {
        this.focused = true;
        this.cdr.detectChanges();
      });
    fromEvent(this.inputRef.nativeElement, 'blur')
      .pipe(takeUntil(this._unSubject))
      .subscribe(() => {
        this.focused = false;
        this.cdr.detectChanges();
      });
    fromEvent<InputEvent>(this.inputRef.nativeElement, 'input')
      .pipe(takeUntil(this._unSubject))
      .subscribe((x: InputEvent) => {
        if (!this.isComposition) {
          this.inputCheckValue(x);
        }
      });
    this.valueChange
      .pipe(
        distinctUntilChanged((a, b) => a === b || (!!this.maxlength && `${b}`.length > Number(this.maxlength))),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.change(x);
      });
  }

  inputCheckValue(x: Event) {
    const input = x.target as HTMLInputElement;
    let value = input.value;
    if (this.type === 'number') {
      const len = XIsEmpty(value) ? 0 : `${value}`.length;
      if (len > Number(this.maxlength)) {
        input.value = value.slice(0, Number(this.maxlength));
      }
    }
    this.xInput.emit(x);
    this.valueChange.next(input.value);
  }

  change(value: any) {
    if (this._required && !this.disabled) {
      this.required = XIsEmpty(value);
    }
    this.setClearable();
    if (this.maxlength) {
      this.valueLength = XIsEmpty(value) ? 0 : `${value}`.length;
      this.lengthTotal = `${this.valueLength}/${this.maxlength}`;
    }
    this.setPadding();
    if (this.onChange && !this.isWriteValue) {
      if (this.type === 'number') {
        if (['', undefined, null].includes(value)) {
          value = null;
        } else {
          value = Number(value);
        }
      }
      this.onChange(value);
    }
    if (this.validator && XIsFunction(this.inputValidator)) {
      this.invalidInputValidator = !this.inputValidator(value);
    }
    this.cdr.detectChanges();
  }

  onClear() {
    const clearValue = this.value;
    this.value = '';
    this.valueChange.next(this.value);
    this.inputRef.nativeElement.focus();
    this.clearEmit.emit(clearValue);
  }

  setFlexClass() {
    if (this.flexClass.length > 0) {
      for (let cls of this.flexClass) {
        this.renderer.removeClass(this.inputElement.nativeElement, cls);
      }
    }
    this.flexClass = this.setFlex(
      this.inputElement.nativeElement,
      this.renderer,
      this.justify,
      this.align,
      this.direction
    );
  }

  setClearable() {
    if (this.clearable && !this.disabled) {
      this.clearShow = !XIsEmpty(this.value);
    } else {
      this.clearShow = false;
    }
    this.setPadding();
  }

  setInheritedValue() {
    if (!this.inputGroup) return;
    if (!XIsUndefined(this.inputGroup.size)) {
      this.size = this.inputGroup.size;
    }
    if (!XIsUndefined(this.inputGroup.bordered)) {
      this.bordered = this.inputGroup.bordered;
    }
  }

  setPadding() {
    this.paddingLeft =
      this.maxlength && this.icon && this.iconLayout === 'right'
        ? (this.lengthTotal.length + 2) * 0.5
        : this.icon && this.iconLayout === 'left'
          ? Number(this.inputIconPadding)
          : Number(this.inputPadding);
    this.paddingRight =
      this.maxlength && this.icon && this.iconLayout === 'left'
        ? (this.lengthTotal.length + 2) * 0.5
        : (this.icon || this.clearShow) && this.iconLayout === 'right'
          ? Number(this.inputIconPadding)
          : this.maxlength && !this.icon
            ? (this.lengthTotal.length + 2) * 0.5
            : Number(this.inputPadding);
  }

  inputFocus(type: 'focus' | 'select' | 'before' | 'after' = 'after') {
    this.inputRef.nativeElement.focus();
    if (!this.value) return;
    if (type === 'after') {
      this.inputRef.nativeElement.setSelectionRange(this.value.length, this.value.length);
    } else if (type === 'before') {
      this.inputRef.nativeElement.setSelectionRange(0, 0);
    } else if (type === 'select') {
      this.inputRef.nativeElement.setSelectionRange(0, this.value.length);
    }
  }

  setClassMap() {
    XClearClass(this.classMap, this.labelMap);
    this.classMap[`${XInputPrefix}-${this.size}`] = this.size ? true : false;
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  formControlChanges() {
    this.valueChange.next(this.value);
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}

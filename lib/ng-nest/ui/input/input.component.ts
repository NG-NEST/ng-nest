import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  TemplateRef,
  HostBinding,
  inject,
  viewChild,
  signal,
  computed
} from '@angular/core';
import { XInputPrefix, XInputProperty } from './input.property';
import { XIsEmpty, XIsUndefined, XIsFunction, XSize } from '@ng-nest/ui/core';
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
export class XInputComponent extends XInputProperty implements OnInit {
  inputElement = viewChild.required('inputElement', { read: ElementRef<HTMLElement> });
  inputRef = viewChild.required('inputRef', { read: ElementRef<HTMLInputElement> });
  inputValueRef = viewChild('inputValueRef', { read: ElementRef<HTMLElement> });
  maxLengthRef = viewChild('maxLengthRef', { read: ElementRef<HTMLElement> });

  @HostBinding('style.width') get getWidth() {
    return this.width();
  }

  override writeValue(value: any) {
    this.value.set(value);
    this.isWriteValue.set(true);
    this.valueChange.next(value);
    this.isWriteValue.set(false);
  }

  classMap = computed(() => ({
    [`${XInputPrefix}-${this.size()}`]: !!this.size(),
    [`x-justify-${this.justify()}`]: !!this.justify(),
    [`x-align-${this.align()}`]: !!this.align(),
    [`x-direction-${this.direction()}`]: !!this.direction()
  }));
  labelMapSignal = computed(() => ({
    [`x-text-align-${this.labelAlign()}`]: !!this.labelAlign()
  }));

  valueLength = signal(0);
  lengthTotal = signal('');
  paddingLeft = computed(() => {
    return this.maxlength() && this.icon() && this.iconLayout() === 'right'
      ? (this.lengthTotal().length + 2) * 0.5 + 'rem'
      : this.icon() && this.iconLayout() === 'left'
        ? this.inputIconPadding()
        : this.inputPadding();
  });
  paddingRight = computed(() => {
    return this.maxlength() && this.icon() && this.iconLayout() === 'left'
      ? (this.lengthTotal().length + 2) * 0.5 + 'rem'
      : ((this.icon() || this.clearShow()) && this.iconLayout() === 'right') ||
          (this.clearShow() && this.iconLayout() === 'left')
        ? this.inputIconPadding()
        : this.maxlength() && !this.icon()
          ? (this.lengthTotal().length + 2) * 0.5 + 'rem'
          : this.inputPadding();
  });
  clearShow = computed(() => {
    if (this.clearable() && !this.disabledComputed()) {
      return !XIsEmpty(this.value());
    } else {
      return false;
    }
  });
  valueChange = new Subject<any>();
  isComposition = signal(false);
  isWriteValue = signal(false);
  private unSubject = new Subject<void>();

  getIcon = computed(() => {
    return !XIsEmpty(this.icon());
  });

  getIconLayoutLeft = computed(() => {
    return !XIsEmpty(this.icon()) && this.iconLayout() === 'left';
  });

  getIconLayoutRight = computed(() => {
    return !XIsEmpty(this.icon()) && this.iconLayout() === 'right';
  });

  getMaxLengthWidth = computed(() => {
    if (this.getIconLayoutRight()) {
      return this.paddingLeft();
    } else {
      return this.paddingRight();
    }
  });

  beforeIsTemplate = computed(() => this.before() instanceof TemplateRef);
  afterIsTemplate = computed(() => this.after() instanceof TemplateRef);

  getTemplateWidth = computed(() => {
    return `calc(100% - ${this.paddingLeft()} - ${this.paddingRight()})`;
  });

  focused = signal(false);
  groupSize = signal<XSize | null>(null);
  groupBordered = signal<boolean | null>(null);

  override cdr = inject(ChangeDetectorRef);
  private inputGroup = inject(XInputGroupComponent, { optional: true });
  elementRef = inject(ElementRef);

  ngOnInit() {
    this.setInheritedValue();
    this.setEvent();
  }

  ngOnDestroy() {
    this.unSubject.next();
    this.unSubject.complete();
  }

  setEvent() {
    const inputRef = this.inputRef().nativeElement;
    fromEvent(inputRef, 'compositionstart')
      .pipe(takeUntil(this.unSubject))
      .subscribe(() => {
        this.isComposition.set(true);
      });
    fromEvent(inputRef, 'compositionend')
      .pipe(takeUntil(this.unSubject))
      .subscribe((x: any) => {
        this.isComposition.set(false);
        this.inputCheckValue(x);
      });
    fromEvent(inputRef, 'focus')
      .pipe(takeUntil(this.unSubject))
      .subscribe(() => {
        this.focused.set(true);
      });
    fromEvent(inputRef, 'blur')
      .pipe(takeUntil(this.unSubject))
      .subscribe(() => {
        this.focused.set(false);
      });
    fromEvent<InputEvent>(inputRef, 'input')
      .pipe(takeUntil(this.unSubject))
      .subscribe((x: InputEvent) => {
        if (!this.isComposition()) {
          this.inputCheckValue(x);
        }
      });
    this.valueChange
      .pipe(
        distinctUntilChanged((a, b) => a === b || (!!this.maxlength() && `${b}`.length > Number(this.maxlength()))),
        takeUntil(this.unSubject)
      )
      .subscribe((x) => {
        this.change(x);
      });
  }

  inputCheckValue(x: Event) {
    const input = x.target as HTMLInputElement;
    let value = input.value;
    if (this.type() === 'number') {
      const len = XIsEmpty(value) ? 0 : `${value}`.length;
      if (len > Number(this.maxlength())) {
        input.value = value.slice(0, this.maxlength()!);
      }
    }
    this.xInput.emit(x);
    this.valueChange.next(input.value);
  }

  change(value: any) {
    if (this.maxlength) {
      this.valueLength.set(XIsEmpty(value) ? 0 : `${value}`.length);
      this.lengthTotal.set(`${this.valueLength()}/${this.maxlength()}`);
    }
    if (this.onChange && !this.isWriteValue()) {
      if (this.type() === 'number') {
        if (['', undefined, null].includes(value)) {
          value = null;
        } else {
          value = Number(value);
        }
      }
      this.onChange(value);
    }
    if (this.validatorComputed() && XIsFunction(this.inputValidator())) {
      this.invalidInputValidator.set(!this.inputValidator()!(value));
    }
  }

  onClear() {
    const clearValue = this.value();
    this.value.set('');
    this.valueChange.next(this.value());
    this.inputRef().nativeElement.focus();
    this.clearEmit.emit(clearValue);
  }

  setInheritedValue() {
    if (!this.inputGroup) return;
    if (!XIsUndefined(this.inputGroup.size())) {
      this.groupSize.set(this.inputGroup.size()!);
    }
    if (!XIsUndefined(this.inputGroup.bordered())) {
      this.groupBordered.set(this.inputGroup.bordered()!);
    }
  }

  inputFocus(type: 'focus' | 'select' | 'before' | 'after' = 'after') {
    this.inputRef().nativeElement.focus();
    if (!this.value()) return;
    if (type === 'after') {
      this.inputRef().nativeElement.setSelectionRange(this.value().length, this.value().length);
    } else if (type === 'before') {
      this.inputRef().nativeElement.setSelectionRange(0, 0);
    } else if (type === 'select') {
      this.inputRef().nativeElement.setSelectionRange(0, this.value().length);
    }
  }

  formControlChanges() {
    this.valueChange.next(this.value());
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}

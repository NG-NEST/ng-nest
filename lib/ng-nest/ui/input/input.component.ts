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
  Optional,
  TemplateRef
} from '@angular/core';
import { XInputPrefix, XInputProperty } from './input.property';
import { XIsEmpty, XIsChange, XClearClass, XConfigService, XIsUndefined } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XInputGroupComponent } from './input-group.component';

@Component({
  selector: `${XInputPrefix}`,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XInputComponent)]
})
export class XInputComponent extends XInputProperty implements OnInit, OnChanges {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  @ViewChild('inputRef', { static: true }) inputRef!: ElementRef;

  writeValue(value: any) {
    this.value = value;
    this.change(value);
    this.cdr.detectChanges();
  }

  valueLength: number = 0;
  lengthTotal: string = '';
  paddingLeft: number = 0.4;
  paddingRight: number = 0.4;
  clearShow: boolean = false;
  flexClass: string[] = [];
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

  get beforeIsTemplate() {
    return this.before instanceof TemplateRef;
  }

  get afterIsTemplate() {
    return this.after instanceof TemplateRef;
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService,
    @Optional() public inputGroup: XInputGroupComponent
  ) {
    super();
  }

  ngOnInit() {
    this.setPadding();
    this.setFlexClass();
    this.setInheritedValue();
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { clearable, size, labelAlign, justify, align, direction } = changes;
    XIsChange(clearable) && this.setClearable();
    XIsChange(size, labelAlign) && this.setClassMap();
    XIsChange(justify, align, direction) && this.setFlexClass();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
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
    if (this.onChange) this.onChange(value);
    this.cdr.detectChanges();
  }

  onClear() {
    const clearValue = this.value;
    this.value = '';
    this.change(this.value);
    this.clearEmit.emit(clearValue);
    this.inputRef.nativeElement.focus();
  }

  setFlexClass() {
    if (this.flexClass.length > 0) {
      for (let cls of this.flexClass) {
        this.renderer.removeClass(this.inputElement.nativeElement, cls);
      }
    }
    this.flexClass = this.setFlex(this.inputElement.nativeElement, this.renderer, this.justify, this.align, this.direction);
  }

  setClearable() {
    if (this.clearable && !this.disabled) {
      this.clearShow = !XIsEmpty(this.value);
    } else {
      this.clearShow = false;
    }
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
        ? (this.lengthTotal.length + 2) * 0.385
        : this.icon && this.iconLayout === 'left'
        ? 1.8
        : 0.4;
    this.paddingRight =
      this.maxlength && this.icon && this.iconLayout === 'left'
        ? (this.lengthTotal.length + 2) * 0.385
        : this.icon && this.iconLayout === 'right'
        ? 1.8
        : this.maxlength && !this.icon
        ? (this.lengthTotal.length + 2) * 0.385
        : 0.4;
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
    this.change(this.value);
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}

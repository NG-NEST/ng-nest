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
  Input
} from '@angular/core';
import { XInputPrefix, XInputProperty } from './input.property';
import { XIsEmpty, XIsChange, XClearClass, XConfigService } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XInputPrefix}`,
  templateUrl: './input.component.html',
  styleUrls: ['./style/index.scss'],
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
  private _required: boolean = false;
  private _unSubject = new Subject();

  get getIcon() {
    return !XIsEmpty(this.icon);
  }

  get getIconLayoutLeft() {
    return !XIsEmpty(this.icon) && this.iconLayout === 'left';
  }

  get getIconLayoutRight() {
    return !XIsEmpty(this.icon) && this.iconLayout === 'right';
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setPadding();
    this.setFlex(this.inputElement.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.clearable) && this.setClearable();
    XIsChange(changes.size, changes.labelAlign) && this.setClassMap();
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

  setClearable() {
    if (this.clearable && !this.disabled) {
      this.clearShow = !XIsEmpty(this.value);
    } else {
      this.clearShow = false;
    }
  }

  setPadding() {
    if (this.maxlength && this.icon && this.iconLayout === 'right') {
      this.paddingLeft = (this.lengthTotal.length + 2) * 0.385;
    } else {
      if (this.icon && this.iconLayout === 'left') {
        this.paddingLeft = 1.8;
      } else {
        this.paddingLeft = 0.4;
      }
    }
    if (this.maxlength && this.icon && this.iconLayout === 'left') {
      this.paddingRight = (this.lengthTotal.length + 2) * 0.385;
    } else {
      if (this.icon && this.iconLayout === 'right') {
        this.paddingRight = 1.8;
      } else {
        if (this.maxlength && !this.icon) {
          this.paddingRight = (this.lengthTotal.length + 2) * 0.385;
        } else {
          this.paddingRight = 0.4;
        }
      }
    }
  }

  inputFocus() {
    this.inputRef.nativeElement.focus();
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

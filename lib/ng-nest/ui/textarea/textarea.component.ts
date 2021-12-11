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
  SimpleChanges
} from '@angular/core';
import { XTextareaPrefix, XTextareaProperty } from './textarea.property';
import { XIsEmpty, XIsChange, XClearClass, XConfigService } from '@ng-nest/ui/core';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XTextareaPrefix}`,
  templateUrl: './textarea.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTextareaComponent)]
})
export class XTextareaComponent extends XTextareaProperty implements OnInit, OnChanges {
  @ViewChild('textarea', { static: true }) textarea!: ElementRef;
  @ViewChild('textareaRef', { static: true }) textareaRef!: ElementRef;

  writeValue(value: any) {
    this.value = value;
    this.change(value);
    this.cdr.detectChanges();
  }

  private _required: boolean = false;
  valueLength: number = 0;
  lengthTotal: string = '';
  paddingLeft: number = 0.4;
  paddingRight: number = 0.4;
  clearShow: boolean = false;

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
    this.setFlex(this.textarea.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { clearable } = changes;
    XIsChange(clearable) && this.setClearable();
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
    this.textareaRef.nativeElement.focus();
  }

  setClearable() {
    if (this.clearable && !this.disabled) {
      this.clearShow = !XIsEmpty(this.value);
    } else {
      this.clearShow = false;
    }
  }

  setPadding() {
    this.paddingLeft = this.icon && this.iconLayout === 'left' ? 1.8 : 0.4;
    this.paddingRight = this.icon && this.iconLayout === 'right' ? 1.8 : 0.4;
  }

  setClassMap() {
    XClearClass(this.classMap, this.labelMap);
    this.classMap[`${XTextareaPrefix}-${this.size}`] = this.size ? true : false;
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  formControlChanges() {
    this.change(this.value);
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}

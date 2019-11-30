import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  ChangeDetectorRef,
  HostBinding,
  forwardRef
} from "@angular/core";
import { XRadioPrefix, XRadioNode } from "./radio.type";
import { Subscription, Subject } from "rxjs";
import { XData } from "@ng-nest/ui/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: `${XRadioPrefix}`,
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XRadioComponent), multi: true }]
})
export class XRadioComponent implements OnInit, ControlValueAccessor {
  @Input() data?: XData<XRadioNode[]>;
  @Input() button?: boolean | string;
  @Input() icon?: boolean | string;
  @HostBinding("class.x-disabled") get getDisabled() {
    return this.disabled;
  }
  private _value: any;
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.setActivated();
      if (this.onChange) this.onChange(value);
      this.cdr.detectChanges();
    }
  }
  private _disabled: boolean | string;
  public get disabled(): boolean | string {
    return this._disabled || this._disabled === "";
  }
  @Input()
  public set disabled(value: boolean | string) {
    if (value !== this._disabled) {
      this._disabled = value;
    }
  }
  onChange: (_: any) => void;
  onTouched: () => void;
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean | string) {
    this.disabled = disabled;
  }
  radioNodes: XRadioNode[] = [];
  activatedRadio: XRadioNode;
  private data$: Subscription | null = null;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XRadioPrefix);
  }

  ngOnInit() {
    this.setInput();
    this.setData();
  }

  ngAfterViewInit() {}

  setInput() {
    this.button = this.button || this.button === "" ? true : false;
    this.icon = this.icon || this.icon === "" ? true : false;
  }

  radioClick(event: Event, node: XRadioNode) {
    event.preventDefault();
    if (this.disabled || node.disabled || node.key === this.value) return;
    this.value = node.key;
  }

  ngOnDestroy(): void {
    if (this.data$) this.data$.unsubscribe();
  }

  private setData() {
    if (this.data instanceof Array) {
      this.setDataChange(this.data);
    } else {
      if (this.data$) this.data$.unsubscribe();
      this.data$ = this.data.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: XRadioNode[]) {
    this.radioNodes = value;
    this.setActivated();
    this.cdr.detectChanges();
  }

  private setActivated() {
    if (typeof this.value !== "undefined" && this.radioNodes.length > 0) {
      this.activatedRadio = this.radioNodes.find(x => x.key === this.value);
    }
  }
}

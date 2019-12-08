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
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { XRadioPrefix, XRadioNode } from "./radio.type";
import { Subscription } from "rxjs";
import { XData, XValueAccessor, XControlValueAccessor, InputBoolean } from "@ng-nest/ui/core";

@Component({
  selector: `${XRadioPrefix}`,
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XRadioComponent)]
})
export class XRadioComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() data?: XData<XRadioNode[]>;
  @Input() @InputBoolean() button?: boolean;
  @Input() @InputBoolean() icon?: boolean;
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
      this.cdr.detectChanges();
    }
  }
  private _disabled: boolean;
  public get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  @InputBoolean()
  public set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = value;
    }
  }
  radioNodes: XRadioNode[] = [];
  private data$: Subscription | null = null;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XRadioPrefix);
  }

  ngOnInit() {
    this.setInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setData();
    }
  }

  setInput() {
    this.cdr.markForCheck();
  }

  radioClick(event: Event, node: XRadioNode) {
    event.preventDefault();
    if (this.disabled || node.disabled || node.key === this.value) return;
    this.value = node.key;
    if (this.onChange) this.onChange(this.value);
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }

  private setData() {
    if (typeof this.data === "undefined") return;
    if (this.data instanceof Array) {
      this.setDataChange(this.data);
    } else {
      this.data$ && this.data$.unsubscribe();
      this.data$ = this.data.subscribe(x => {
        this.setDataChange(x);
      });
    }
  }

  private setDataChange(value: XRadioNode[]) {
    this.radioNodes = value;
    this.cdr.detectChanges();
  }
}

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
import { XData, XValueAccessor, XControlValueAccessor } from "@ng-nest/ui/core";

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
  radioNodes: XRadioNode[] = [];
  activatedRadio: XRadioNode;
  private data$: Subscription | null = null;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XRadioPrefix);
  }

  ngOnInit() {
    this.setInput();
    this.setData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let dataChange = changes.data;
    if (dataChange && dataChange.currentValue !== dataChange.previousValue) {
      this.setData();
    }
  }

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
    if (typeof this.data === "undefined") return;
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

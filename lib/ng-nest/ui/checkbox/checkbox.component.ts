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
import { XCheckboxPrefix, XCheckboxNode } from "./checkbox.type";
import { Subscription, Observable } from "rxjs";
import {
  XData,
  XValueAccessor,
  XControlValueAccessor,
  XInputBoolean,
  XDataConvert,
  XIsObservable,
  XToDataConvert
} from "@ng-nest/ui/core";
import { map } from "rxjs/operators";

@Component({
  selector: `${XCheckboxPrefix}`,
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCheckboxComponent)]
})
export class XCheckboxComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XCheckboxNode[]>;
  @Input() @XInputBoolean() button?: boolean;
  @Input() @XInputBoolean() icon?: boolean;
  @Input() @XInputBoolean() indeterminate?: boolean;
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
  @XInputBoolean()
  public set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = value;
    }
  }
  checkboxNodes: XCheckboxNode[] = [];
  private data$: Subscription | null = null;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XCheckboxPrefix);
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

  checkboxClick(event: Event, node: XCheckboxNode) {
    event.preventDefault();
    if (this.disabled || node.disabled) return;
    if (typeof this.value === "undefined") this.value = [];
    let index = this.value.indexOf(node.value);
    if (index >= 0) {
      this.value.splice(index, 1);
      this.value = [...this.value];
    } else this.value = [...this.value, node.value];
    if (this.onChange) this.onChange(this.value);
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }

  private setData() {
    if (typeof this.data === "undefined") return;
    if (XIsObservable(this.data)) {
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
      });
    } else {
      this.setDataChange(this.data as XCheckboxNode[]);
    }
  }

  private setDataChange(value: XCheckboxNode[]) {
    this.checkboxNodes = value;
    this.cdr.detectChanges();
  }
}

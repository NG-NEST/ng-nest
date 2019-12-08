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
import { Subscription } from "rxjs";
import { XData, XValueAccessor, XControlValueAccessor, InputBoolean } from "@ng-nest/ui/core";

@Component({
  selector: `${XCheckboxPrefix}`,
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XCheckboxComponent)]
})
export class XCheckboxComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() data?: XData<XCheckboxNode[]>;
  @Input() @InputBoolean() button?: boolean;
  @Input() @InputBoolean() icon?: boolean;
  @Input() @InputBoolean() indeterminate?: boolean;
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
    let index = this.value.indexOf(node.key);
    if (index >= 0) {
      this.value.splice(index, 1);
      this.value = [...this.value];
    } else this.value = [...this.value, node.key];
    if (this.onChange) this.onChange(this.value);
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

  private setDataChange(value: XCheckboxNode[]) {
    this.checkboxNodes = value;
    this.cdr.detectChanges();
  }
}

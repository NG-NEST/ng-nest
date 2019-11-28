import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  ChangeDetectorRef
} from "@angular/core";
import { XRadioPrefix, XRadioNode } from "./radio.type";
import { XData, XValueAccessor, XControlValueAccessor } from "@ng-nest/ui/core";
import { Subscription } from "rxjs";

@Component({
  selector: `${XRadioPrefix}`,
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XRadioComponent)]
})
export class XRadioComponent extends XControlValueAccessor implements OnInit {
  @Input() data?: XData<XRadioNode[]>;
  radioNodes: XRadioNode[] = [];
  activatedRadio: XRadioNode;
  private data$: Subscription | null = null;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
    this.setSubject();
    this.renderer.addClass(this.elementRef.nativeElement, XRadioPrefix);
  }

  ngOnInit() {
    this.setInput();
    this.setData();
  }

  ngAfterViewInit() {}

  setInput() {
    this.disabled = this.disabled || this.disabled === "" ? true : false;
  }

  radioClick(event: Event, node: XRadioNode) {
    event.preventDefault();
    if (this.disabled || node.disabled || node.key === this.value) return;
    this.value = node.key;
  }

  ngOnDestroy(): void {
    if (this.data$) this.data$.unsubscribe();
    if (this.disabledChange$) this.disabledChange.unsubscribe();
    if (this.valueChange$) this.valueChange.unsubscribe();
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

  private setSubject() {
    this.valueChange$ = this.valueChange.subscribe(x => {
      this.setActivated();
      this.cdr.detectChanges();
    });
    this.disabledChange$ = this.disabledChange.subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  forwardRef,
  ContentChildren,
  QueryList
} from "@angular/core";
import { XRadiosPrefix } from "./radio.type";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { XRadioComponent } from "./radio.component";

@Component({
  selector: `${XRadiosPrefix}`,
  templateUrl: "./radios.component.html",
  styleUrls: ["./radios.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XRadiosComponent), multi: true }]
})
export class XRadiosComponent implements OnInit, ControlValueAccessor {
  @ContentChildren(XRadioComponent) radioList: QueryList<XRadioComponent>;

  checkedRadio: XRadioComponent;

  value: any;
  onChange: (_: any) => void;
  onTouched: () => void;

  writeValue(value: boolean): void {
    this.value = value;
    if (this.value) this.setChecked();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {}

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XRadiosPrefix);
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  setChecked() {
    if (!this.checkedRadio || this.value !== this.checkedRadio.value) {
      let radio = this.radioList.find(x => {
        return x.value === this.value;
      });
      if (radio) {
        radio.checked = true;
      }
      console.log(radio);
      this.cdr.detectChanges();
    }
  }
}

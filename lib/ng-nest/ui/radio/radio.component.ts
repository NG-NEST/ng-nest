import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  HostBinding,
  Input,
  HostListener,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  forwardRef
} from "@angular/core";
import { XRadioPrefix } from "./radio.type";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export function X_VALUE_ACCESSOR(component) {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => component), multi: true };
}

@Component({
  selector: `${XRadioPrefix}`,
  templateUrl: "./radio.component.html",
  styleUrls: ["./style/index.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [X_VALUE_ACCESSOR(XRadioComponent)]
})
export class XRadioComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() value: string | number | boolean;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @HostBinding("class.x-checked") get getChecked() {
    console.log(this.model === this.value);
    return this.model === this.value;
  }

  model: string | number | boolean;
  onValueChange: (_: any) => void;
  onValueTouched: () => void;

  writeValue(val: string | number | boolean): void {
    this.model = val;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onValueTouched = fn;
  }

  setDisabledState(disabled: boolean) {}

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XRadioPrefix);
  }

  ngOnInit() {}

  modelChange() {
    this.model = this.value;
    this.valueChange.emit(this.value);
    this.onValueChange(this.value);
    console.log(this.model);
  }
}

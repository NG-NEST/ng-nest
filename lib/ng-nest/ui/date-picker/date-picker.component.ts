import { XDatePickerPortalComponent } from './date-picker-portal.component';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subscription, Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  OnChanges,
  ViewContainerRef,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import { XDatePickerPrefix, XDatePickerProperty, XDatePickerModelType } from './date-picker.property';
import { XValueAccessor, XIsEmpty, XIsDate, XIsNumber, XIsChange } from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';
import { DatePipe } from '@angular/common';

@Component({
  selector: `${XDatePickerPrefix}`,
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDatePickerComponent), DatePipe]
})
export class XDatePickerComponent extends XDatePickerProperty implements OnInit, OnChanges {
  @ViewChild('datePicker', { static: true }) datePicker: ElementRef;
  @ViewChild('inputCom', { static: true }) inputCom: XInputComponent;

  modelType: XDatePickerModelType = 'date';
  numberValue: number | string;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: any) {
    if (XIsDate(value)) {
      this.modelType = 'date';
      this.numberValue = value.getTime();
    } else if (XIsNumber(value)) {
      this.modelType = 'number';
      this.numberValue = value;
    } else if (XIsEmpty(value)) {
      this.numberValue = '';
    }
    this.value = value;
    this.setDisplayValue();
    this.valueChange.next(this.numberValue);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  enter: boolean = false;
  inputClearable: boolean = false;
  displayValue: any = '';
  portal: XPortalOverlayRef<XDatePickerPortalComponent>;
  icon: string = 'fto-calendar';
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  scrollFunction: Function;
  resizeFunction: Function;
  private data$: Subscription | null = null;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();

  constructor(
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private datePipe: DatePipe
  ) {
    super(renderer);
    this.renderer.addClass(this.elementRef.nativeElement, XDatePickerPrefix);
  }

  ngOnInit() {
    this.setFlex(this.datePicker.nativeElement, this.justify, this.align, this.direction);
    this.setFormat();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (XIsChange(changes.type)) {
      this.setFormat();
      this.setDisplayValue();
    }
  }

  ngOnDestroy(): void {
    this.data$?.unsubscribe();
  }

  setFormat() {
    if (this.type === 'date') {
      this.format = 'yyyy-MM-dd';
    } else if (this.type === 'year') {
      this.format = 'yyyy';
    } else if ((this.type = 'month')) {
      this.format = 'yyyy-MM';
    }
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!XIsEmpty(this.numberValue)) {
      this.icon = '';
      this.inputClearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    if (this.disabled) return;
    this.enter = false;
    if (this.inputClearable) {
      this.icon = 'fto-calendar';
      this.inputClearable = false;
      this.cdr.detectChanges();
    }
  }

  clearEmit() {
    this.value = '';
    this.numberValue = '';
    this.displayValue = '';
    this.mleave();
    this.valueChange.next(this.numberValue);
    this.modelChange();
  }

  modelChange() {
    if (this.onChange) {
      this.onChange(this.getValue());
    }
  }

  getValue() {
    return this.modelType === 'date'
      ? new Date(this.numberValue)
      : this.modelType === 'string'
      ? this.datePipe.transform(this.numberValue, this.format)
      : this.numberValue;
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.dispose();
      return true;
    }
    return false;
  }

  showPortal() {
    if (this.disabled) return;
    if (this.closePortal()) return;
    this.portal = this.portalService.attach({
      content: XDatePickerPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        backdropClass: '',
        positionStrategy: this.setPlacement()
      }
    });
    this.setInstance();
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      type: this.type,
      value: this.numberValue,
      valueChange: this.valueChange,
      closePortal: () => this.closePortal(),
      nodeEmit: (node: Date) => this.onNodeClick(node)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(date: Date) {
    this.numberValue = date.getTime();
    this.value = this.getValue();
    this.setDisplayValue();
    this.closePortal();
    this.modelChange();
    this.nodeClick.emit(this.numberValue);
  }

  setDisplayValue() {
    this.displayValue = this.datePipe.transform(this.numberValue, this.format);
  }

  setPlacement() {
    return this.portalService.setPlacement(this.inputCom.input, 'bottom-start', 'bottom-end', 'top-start', 'top-end');
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }
}

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
  Input,
  OnChanges,
  ViewContainerRef,
  ViewChild,
  EventEmitter,
  Output,
  Inject,
  SimpleChanges
} from '@angular/core';
import {
  XDatePickerPrefix,
  XDatePickerPortal,
  XDatePickerInput,
  XDatePickerType,
  XDatePickerModelType
} from './date-picker.type';
import {
  fillDefault,
  XValueAccessor,
  XControlValueAccessor,
  XIsEmpty,
  XIsDate,
  XIsNumber,
  XInputBoolean
} from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';
import { DOCUMENT, DatePipe } from '@angular/common';

@Component({
  selector: 'x-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDatePickerComponent), DatePipe]
})
export class XDatePickerComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() type: XDatePickerType = 'date';
  @Input() format: string = 'yyyy-MM-dd';
  @Input() @XInputBoolean() clearable: boolean = true;
  @ViewChild('datePicker', { static: true }) datePicker: ElementRef;
  @ViewChild('inputCom', { static: true }) inputCom: XInputComponent;
  @Output() nodeEmit?: EventEmitter<number> = new EventEmitter<number>();
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
  portal: XPortalOverlayRef;
  icon: string = 'fto-calendar';
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  scrollFunction: Function;
  resizeFunction: Function;
  private _default: XDatePickerInput = {};
  private data$: Subscription | null = null;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();

  constructor(
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private doc: any
  ) {
    super(renderer);
    this.renderer.addClass(this.elementRef.nativeElement, XDatePickerPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setFlex(this.datePicker.nativeElement, this.justify, this.align, this.direction);
    this.setFormat();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let typeChange = changes.type;
    if (typeChange && typeChange.currentValue !== typeChange.previousValue) {
      this.setFormat();
      this.setDisplayValue();
    }
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
    this.removeListen();
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

  addListen() {
    this.scrollFunction = this.renderer.listen('window', 'scroll', () => {
      this.setPortal();
    });
    this.resizeFunction = this.renderer.listen('window', 'resize', () => {
      this.setPortal();
    });
  }

  removeListen() {
    this.scrollFunction && this.scrollFunction();
    this.resizeFunction && this.resizeFunction();
    this.cdr.markForCheck();
  }

  change() {
    // if (this.onChange) this.onChange(this.value);
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
    return this.portal && this.portal.overlayRef.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal.overlayRef.dispose();
      this.removeListen();
      return true;
    }
    return false;
  }

  showPortal(event: Event) {
    if (this.disabled) return;
    if (this.closePortal()) return;
    this.portal = this.portalService.create({
      content: XDatePickerPortalComponent,
      viewContainerRef: this.viewContainerRef,
      injector: this.portalService.createInjector(
        {
          type: this.type,
          value: this.numberValue,
          valueChange: this.valueChange,
          closePortal: () => this.closePortal(),
          nodeEmit: node => this.nodeClick(node)
        },
        XDatePickerPortal
      ),
      overlayConfig: {
        backdropClass: '',
        positionStrategy: this.setPositionStrategy()
      }
    });
    this.addListen();
  }

  nodeClick(date: Date) {
    this.numberValue = date.getTime();
    this.value = this.getValue();
    this.setDisplayValue();
    this.closePortal();
    this.modelChange();
    this.nodeEmit.emit(this.numberValue);
  }

  setDisplayValue() {
    this.displayValue = this.datePipe.transform(this.numberValue, this.format);
  }

  setPositionStrategy() {
    this.box = this.inputCom.input.nativeElement.getBoundingClientRect();
    this.protalTobottom = this.doc.documentElement.clientHeight - this.box.top - this.box.height > this.protalHeight;
    return this.portalService.setPositionStrategy(
      this.inputCom.input,
      this.protalTobottom ? 'bottom-start' : 'top-start'
    );
  }

  setPortal() {
    if (!this.inputCom.input) return;
    this.box = this.inputCom.input.nativeElement.getBoundingClientRect();
    this.protalHeight = 300;
    // if (this.box && this.nodes.length > 0) {
    //   this.protalHeight = this.box.height * (this.nodes.length > this.maxNodes ? this.maxNodes : this.nodes.length);
    // }
    if (this.portalAttached()) {
      this.portal.overlayRef.updatePositionStrategy(this.setPositionStrategy());
    }
  }
}

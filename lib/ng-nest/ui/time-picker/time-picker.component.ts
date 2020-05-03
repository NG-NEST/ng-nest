import { XTimePickerPortalComponent } from './time-picker-portal.component';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  Input,
  ViewContainerRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { XTimePickerPrefix, XTimePickerType, XTimePickerProperty } from './time-picker.property';
import { XValueAccessor, XIsEmpty, XIsDate, XIsNumber } from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';
import { DatePipe } from '@angular/common';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: `${XTimePickerPrefix}`,
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTimePickerComponent), DatePipe]
})
export class XTimePickerComponent extends XTimePickerProperty implements OnInit {
  @Input() type: XTimePickerType = 'time';
  @Input() format: string = 'HH:mm:ss';
  @Output() nodeClick = new EventEmitter<number>();
  @ViewChild('datePicker', { static: true }) datePicker: ElementRef;
  @ViewChild('inputCom', { static: true }) inputCom: XInputComponent;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: any) {
    if (XIsDate(value)) this.value = value.getTime();
    else if (XIsNumber(value)) this.value = value;
    else if (XIsEmpty(value)) this.value = '';
    this.setDisplayValue();
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = '';
  portal: XPortalOverlayRef<XTimePickerPortalComponent>;
  icon: string = 'fto-clock';
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  private _unSubject = new Subject<void>();
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();

  constructor(
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef,
    private datePipe: DatePipe,
    private overlay: Overlay
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XTimePickerPrefix);
  }

  ngOnInit() {
    this.setFlex(this.datePicker.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setFormat();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setFormat() {
    if (this.format === 'HH:mm:ss') {
      if (this.type === 'hour') {
        this.format = 'HH';
      } else if (this.type === 'minute') {
        this.format = 'HH:mm';
      }
    }
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!XIsEmpty(this.value)) {
      this.icon = '';
      this.clearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    if (this.disabled) return;
    this.enter = false;
    if (this.clearable) {
      this.icon = 'fto-clock';
      this.clearable = false;
      this.cdr.detectChanges();
    }
  }

  clearEmit() {
    this.value = '';
    this.displayValue = '';
    this.mleave();
    this.valueChange.next(this.value);
    if (this.onChange) this.onChange(this.value);
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
      content: XTimePickerPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        backdropClass: '',
        positionStrategy: this.setPlacement(),
        scrollStrategy: this.overlay.scrollStrategies.reposition()
      }
    });
    this.setInstance();
  }

  setInstance() {
    let componentRef = this.portal?.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      type: this.type,
      value: this.value,
      valueChange: this.valueChange,
      closePortal: () => this.closePortal(),
      nodeEmit: (node: Date) => this.onNodeClick(node)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(date: Date) {
    this.value = date.getTime();
    this.setDisplayValue();
    if (this.onChange) this.onChange(this.value);
    this.nodeClick.emit(this.value);
  }

  setDisplayValue() {
    this.displayValue = this.datePipe.transform(this.value, this.format);
  }

  setPlacement() {
    return this.portalService.setPlacement(this.inputCom.input, 'bottom-start', 'bottom-end', 'top-start', 'top-end');
  }

  setPortal() {
    if (this.portalAttached()) {
      this.portal.overlayRef?.updatePositionStrategy(this.setPlacement());
    }
  }
}

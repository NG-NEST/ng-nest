import { XColorPickerPortalComponent } from './color-picker-portal.component';
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
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { XColorPickerPrefix, XColorPickerProperty } from './color-picker.property';
import { XValueAccessor, XIsEmpty } from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'x-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XColorPickerComponent)]
})
export class XColorPickerComponent extends XColorPickerProperty implements OnInit {
  @ViewChild('colorPicker', { static: true }) colorPicker: ElementRef;
  @ViewChild('inputCom', { static: true }) inputCom: XInputComponent;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: string) {
    this.value = value;
    this.displayValue = value;
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: string = '';
  portal: XPortalOverlayRef<XColorPickerPortalComponent>;
  icon: string = 'fto-chevron-down';
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  valueChange: Subject<any> = new Subject();
  dataChange: Subject<any> = new Subject();

  constructor(
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private viewContainerRef: ViewContainerRef
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XColorPickerPrefix);
  }

  ngOnInit() {
    this.setFlex(this.colorPicker.nativeElement, this.renderer, this.justify, this.align, this.direction);
  }

  ngAfterViewInit() {
    this.setPortal();
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
      this.icon = 'fto-chevron-down';
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
      content: XColorPickerPortalComponent,
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
      value: this.value,
      valueChange: this.valueChange,
      closePortal: () => this.closePortal(),
      nodeEmit: (color: string) => this.onNodeClick(color)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNodeClick(color: string) {
    this.value = color;
    this.displayValue = color;
    if (this.onChange) this.onChange(this.value);
  }

  setPlacement() {
    return this.portalService.setPlacement(this.inputCom.input, 'bottom-start', 'bottom-end', 'top-start', 'top-end');
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }
}

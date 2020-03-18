import { Subscription, Subject, Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  Input,
  HostBinding,
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  ViewChild,
  TemplateRef,
  Inject,
  NgZone
} from '@angular/core';
import { XSelectPrefix, XSelectInput, XSelectNode, XSelectPortal } from './select.type';
import {
  fillDefault,
  XValueAccessor,
  XControlValueAccessor,
  XJustify,
  XAlign,
  XDirection,
  XData,
  XIsEmpty,
  XInputBoolean,
  XDataConvert,
  XToDataConvert,
  XIsObservable,
  removeNgTag,
  XIsChange
} from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { DOCUMENT } from '@angular/common';
import { XSelectPortalComponent } from './select-portal.component';
import { map } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'x-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSelectComponent)]
})
export class XSelectComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XSelectNode[]>;
  @Input() @XInputBoolean() async?: boolean;
  @ViewChild('inputCom', { static: true }) inputCom: XInputComponent;
  @ViewChild('select', { static: true }) select: ElementRef;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: any) {
    this.value = value;
    this.setDisplayValue();
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  readonly: boolean = true;
  clearable: boolean = false;
  enter: boolean = false;
  displayValue: any = '';
  nodes: XSelectNode[] = [];
  portal: XPortalOverlayRef;
  icon: string = 'fto-chevron-down';
  iconSpin: boolean = false;
  box: DOMRect;
  protalHeight: number;
  maxNodes: number = 6;
  protalTobottom: boolean = true;
  asyncLoading = false;
  scrollFunction: Function;
  resizeFunction: Function;
  private _default: XSelectInput = {};
  private data$: Subscription | null = null;
  valueChange: Subject<any> = new Subject();

  constructor(
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private portalService: XPortalService,
    private ngZone: NgZone,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    @Inject(DOCUMENT) private doc: any
  ) {
    super(renderer);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setFlex(this.select.nativeElement, this.justify, this.align, this.direction);
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      if (!this.async) {
        this.data$ && this.data$.unsubscribe();
        this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
          this.setDataChange(x);
        });
      }
    } else {
      this.setDataChange(this.data as XSelectNode[]);
    }
  }

  private setDataChange(value: XSelectNode[]) {
    this.nodes = value;
    this.setDisplayValue();
    this.cdr.detectChanges();
  }

  change(event: Event) {
    // if (this.onChange) this.onChange(this.value);
  }

  menter() {
    if (this.disabled) return;
    this.enter = true;
    if (!XIsEmpty(this.displayValue)) {
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

  clearEmit(event: Event) {
    this.value = '';
    this.displayValue = '';
    this.mleave();
    this.valueChange.next(this.value);
    if (this.onChange) this.onChange(this.value);
  }

  setDisplayValue() {
    if (this.nodes.length > 0) {
      let node = this.nodes.find(x => x.id === this.value);
      this.displayValue = node ? node.label : '';
    }
  }

  portalAttached() {
    return this.portal && this.portal.overlayRef.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal.overlayRef.dispose();
      // this.removeListen();
      return true;
    }
    return false;
  }

  showPortal(event: Event) {
    if (this.disabled || this.iconSpin) return;
    if (this.closePortal()) return;
    if (this.async && XIsObservable(this.data) && this.nodes.length === 0) {
      this.data$ && this.data$.unsubscribe();
      this.icon = 'fto-loader';
      this.iconSpin = true;
      this.cdr.detectChanges();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
        this.createPortal();
        this.icon = 'fto-chevron-down';
        this.iconSpin = false;
        this.cdr.detectChanges();
      });
    } else {
      this.createPortal();
    }
  }

  createPortal() {
    this.nodes.filter(x => x.selected).map(x => (x.selected = false));
    this.box = this.inputCom.input.nativeElement.getBoundingClientRect();
    this.portal = this.portalService.create({
      content: XSelectPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        backdropClass: '',
        scrollStrategy: this.overlay.scrollStrategies.reposition({ autoClose: true }),
        width: this.box.width,
        positionStrategy: this.setPlacement()
      }
    });
    this.setInstance();
  }

  setInstance() {
    this.portal.componentRef.instance.data = this.nodes;
    this.portal.componentRef.instance.value = this.value;
    this.portal.componentRef.instance.valueChange = this.valueChange;
    this.portal.componentRef.instance.closePortal = () => this.closePortal();
    this.portal.componentRef.instance.nodeEmit = node => this.nodeClick(node);
    this.portal.componentRef.changeDetectorRef.detectChanges();
  }

  nodeClick(node: XSelectNode) {
    event.preventDefault();
    if (node.disabled) return;
    this.displayValue = node.label;
    this.value = node.id;
    this.closePortal();
    if (this.onChange) this.onChange(this.value);
    this.cdr.detectChanges();
  }

  setPlacement() {
    return this.portalService.setPlacement(this.inputCom.input, 'bottom-start', 'top-start');
  }
}

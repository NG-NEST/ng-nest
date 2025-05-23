import { XColorPickerPortalComponent } from './color-picker-portal.component';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { Subject, fromEvent } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  ViewContainerRef,
  inject,
  AfterViewInit,
  OnDestroy,
  viewChild,
  signal,
  computed,
  ComponentRef,
  effect,
  TemplateRef
} from '@angular/core';
import { XColorPickerProperty } from './color-picker.property';
import { XIsEmpty, XCorner, XParents, XPlacement, XComputed } from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';
import {
  Overlay,
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  OverlayRef
} from '@angular/cdk/overlay';
import { filter, takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { DOCUMENT } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XColorPickerColorMap } from './color-map.data';

@Component({
  selector: 'x-color-picker',
  imports: [FormsModule, ReactiveFormsModule, XInputComponent],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XColorPickerComponent)]
})
export class XColorPickerComponent extends XColorPickerProperty implements OnInit, AfterViewInit, OnDestroy {
  colorPicker = viewChild.required('colorPicker', { read: ElementRef<HTMLElement> });
  inputCom = viewChild.required('inputCom', { read: XInputComponent });
  panelTemplate = viewChild.required<TemplateRef<any>>('panelTemplate');
  private doc = inject(DOCUMENT);
  primaryColor = XComputed(this.doc.documentElement).getPropertyValue('--x-primary').trim();

  inputStyle = computed(() => ({
    backgroundColor: this.value(),
    color: 'transparent'
  }));

  clearable = signal(false);
  enter = signal(false);
  animating = signal(false);
  portal!: XPortalOverlayRef<XColorPickerPortalComponent>;
  icon = signal('fto-chevron-down');
  closeSubject: Subject<void> = new Subject();
  document = inject(DOCUMENT);
  private unSubject = new Subject<void>();
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);

  private realPlacement = signal<XPlacement | null>(null);
  portalComponent = signal<ComponentRef<XColorPickerPortalComponent> | null>(null);
  portalOverlayRef = signal<OverlayRef | null>(null);

  constructor() {
    super();
    effect(() =>
      this.portalComponent()?.setInput('value', XColorPickerColorMap[this.value()] || this.value() || this.primaryColor)
    );
    effect(() => this.portalComponent()?.setInput('placement', this.realPlacement()));
    effect(() => this.portalComponent()?.setInput('inputCom', this.inputCom()));
    effect(() => this.portalComponent()?.setInput('panelTemplate', this.panelTemplate()));
  }

  ngOnInit() {
    this.setSubject();
    this.setParantScroll();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.closePortal();
    });
  }

  menter() {
    if (this.disabledComputed()) return;
    this.enter.set(true);
    if (!XIsEmpty(this.value())) {
      this.icon.set('');
      this.clearable.set(true);
    }
  }

  mleave() {
    if (this.disabledComputed()) return;
    this.enter.set(false);
    if (this.clearable()) {
      this.icon.set('fto-chevron-down');
      this.clearable.set(false);
    }
  }

  clearEmit() {
    this.value.set('');
    this.mleave();
    if (this.onChange) this.onChange(this.value());
  }

  portalAttached() {
    return this.portalOverlayRef()?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portalOverlayRef()?.detach();
      this.active.set(false);
    }
  }

  showPortal() {
    if (this.disabledComputed() || this.animating()) return;
    this.active.set(true);
    const config: OverlayConfig = {
      backdropClass: '',
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XColorPickerPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.portal.overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this.unSubject))
      .subscribe(() => {
        this.closeSubject.next();
      });
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this.unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XCorner;
      if (place !== this.realPlacement()) {
        this.realPlacement.set(place);
        this.portalOverlayRef()?.updatePosition();
      }
    });
  }

  setParantScroll() {
    if (!this.document) return;
    const parents = XParents(this.elementRef.nativeElement);
    let firstScroll: HTMLElement | null = null;
    for (let item of parents) {
      if (item.clientHeight < item.scrollHeight) {
        firstScroll = item;
        break;
      }
    }
    if (firstScroll && firstScroll.tagName !== 'BODY') {
      fromEvent(firstScroll, 'scroll')
        .pipe(
          filter(() => this.portalAttached()!),
          takeUntil(this.unSubject)
        )
        .subscribe(() => {
          this.portalOverlayRef()?.updatePosition();
          const eract = this.elementRef.nativeElement.getBoundingClientRect();
          const frect = firstScroll!.getBoundingClientRect();
          if (eract.top + eract.height - frect.top < 0 || eract.bottom > frect.bottom) {
            this.closeSubject.next();
          }
        });
    }
  }

  setInstance() {
    let { componentRef, overlayRef } = this.portal;
    this.portalComponent.set(componentRef!);
    this.portalOverlayRef.set(overlayRef!);
    this.realPlacement.set(this.placement());
    const { nodeClick, animating } = componentRef!.instance;
    nodeClick.subscribe((color: string) => this.onNodeClick(color));
    animating.subscribe((ing: boolean) => this.animating.set(ing));
  }

  onNodeClick(color: string) {
    this.value.set(color);
    this.inputCom().inputFocus('focus');
    if (this.onChange) this.onChange(this.value());
    this.formControlValidator();
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom().inputRef(),
      placement: [this.placement() as XCorner, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-color-picker-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portalOverlayRef()?.updatePositionStrategy(this.setPlacement());
  }
}

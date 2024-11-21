import { XTimePickerPortalComponent } from './time-picker-portal.component';
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
  signal,
  computed,
  viewChild,
  ComponentRef,
  effect
} from '@angular/core';
import { XTimePickerPrefix, XTimePickerProperty } from './time-picker.property';
import { XIsEmpty, XIsDate, XIsNumber, XCorner, XIsString, XParents, XPlacement } from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';
import { DOCUMENT, DatePipe } from '@angular/common';
import {
  Overlay,
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  OverlayRef
} from '@angular/cdk/overlay';
import { takeUntil, map, filter } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nService, XI18nTimePicker, zh_CN } from '@ng-nest/ui/i18n';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XTimePickerPrefix}`,
  imports: [FormsModule, XInputComponent],
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTimePickerComponent), DatePipe]
})
export class XTimePickerComponent extends XTimePickerProperty implements OnInit, AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private datePipe = inject(DatePipe);
  private overlay = inject(Overlay);
  private i18n = inject(XI18nService);

  datePicker = viewChild.required<ElementRef<HTMLElement>>('datePicker');
  inputCom = viewChild.required<XInputComponent>('inputCom');

  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.timePicker as XI18nTimePicker)), {
    initialValue: zh_CN.timePicker
  });

  override writeValue(value: any) {
    let valueType: 'date' | 'number' | 'string' = 'date';
    if (XIsEmpty(value)) {
      value = '';
    } else if (XIsNumber(value)) {
      valueType = 'number';
    } else if (XIsString(value)) {
      value = new Date(value).getTime();
      valueType = 'string';
    } else if (XIsDate(value)) {
      value = value.getTime();
    }
    this.value.set(value);
    this.valueType.set(valueType);
  }

  displayValue = computed(() => {
    const value = this.value();
    if (!value) return;
    if (this.use12Hours()) {
      let dt = new Date(value);
      let hour = dt.getHours();
      let suffix = hour >= 12 ? this.locale().pm : this.locale().am;
      return `${this.datePipe.transform(
        dt.setHours(hour === 0 ? 12 : hour > 12 ? hour - 12 : hour),
        this.formatSignal()
      )} ${suffix}`;
    } else {
      return this.datePipe.transform(value, this.formatSignal());
    }
  });

  formatSignal = computed(() => {
    if (this.format() === 'HH:mm:ss') {
      if (this.type() === 'hour') {
        return 'HH';
      } else if (this.type() === 'minute') {
        return 'HH:mm';
      }
    }
    return this.format();
  });

  clearable = signal(false);
  enter = signal(false);
  animating = signal(false);
  portal!: XPortalOverlayRef<XTimePickerPortalComponent>;
  icon = signal('fto-clock');
  closeSubject: Subject<void> = new Subject();
  valueType = signal<'date' | 'number' | 'string'>('date');
  private unSubject = new Subject<void>();
  document = inject(DOCUMENT);

  getPlaceholder = computed(() => {
    if (this.placeholder()) return this.placeholder();
    if (this.type() === 'time') {
      return this.locale().selectTime;
    } else if (this.type() === 'hour') {
      return this.locale().selectHour;
    } else if (this.type() === 'minute') {
      return this.locale().selectMinute;
    } else {
      return this.locale().selectTime;
    }
  });

  private realPlacement = signal<XPlacement | null>(null);
  portalComponent = signal<ComponentRef<XTimePickerPortalComponent> | null>(null);
  portalOverlayRef = signal<OverlayRef | null>(null);

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('value', this.value()));
    effect(() => this.portalComponent()?.setInput('placement', this.realPlacement()));
    effect(() => this.portalComponent()?.setInput('use12Hours', this.use12Hours()));
    effect(() => this.portalComponent()?.setInput('type', this.type()));
    effect(() => this.portalComponent()?.setInput('hourStep', this.hourStep()));
    effect(() => this.portalComponent()?.setInput('minuteStep', this.minuteStep()));
    effect(() => this.portalComponent()?.setInput('secondStep', this.secondStep()));
    effect(() => this.portalComponent()?.setInput('preset', this.preset()));
    effect(() => this.portalComponent()?.setInput('inputCom', this.inputCom()));
    effect(() => this.portalComponent()?.setInput('disabledTime', this.disabledTime()));
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
      this.icon.set('fto-clock');
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
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portalOverlayRef()?.dispose();
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
      content: XTimePickerPortalComponent,
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

  setInstance() {
    let { componentRef, overlayRef } = this.portal;
    if (!componentRef || !overlayRef) return;
    this.portalComponent.set(componentRef);
    this.portalOverlayRef.set(overlayRef);
    this.realPlacement.set(this.placement());
    const { nodeClick, animating } = componentRef.instance;
    nodeClick.subscribe((node: Date) => this.onNodeClick(node));
    animating.subscribe((ing: boolean) => this.animating.set(ing));
  }

  onNodeClick(date: Date) {
    this.value.set(this.setValue(date));
    if (this.onChange) this.onChange(this.value());
    this.formControlValidator();
    this.nodeEmit.emit(this.value());
  }

  setValue(value: Date) {
    return ['date', 'string'].includes(this.valueType()) ? new Date(value) : value.getTime();
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom().inputRef(),
      placement: [this.placement() as XCorner, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-time-picker-portal'
    });
  }

  setPortal() {
    if (this.portalAttached()) {
      this.portalOverlayRef()?.updatePositionStrategy(this.setPlacement());
    }
  }

  formControlChanges() {
    this.ngOnInit();
  }
}

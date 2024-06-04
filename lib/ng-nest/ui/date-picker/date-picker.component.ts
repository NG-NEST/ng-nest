import { XDatePickerPortalComponent } from './date-picker-portal.component';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { Subject, fromEvent } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  OnChanges,
  ViewContainerRef,
  SimpleChanges,
  inject,
  signal,
  computed,
  viewChild,
  ComponentRef,
  effect
} from '@angular/core';
import { XDatePickerPrefix, XDatePickerProperty, XDatePickerModelType } from './date-picker.property';
import {
  XIsEmpty,
  XIsDate,
  XIsNumber,
  XIsChange,
  XCorner,
  XIsString,
  XIsNull,
  XDateYearWeek,
  XDateYearQuarter,
  XParents,
  XPlacement
} from '@ng-nest/ui/core';
import { XInputComponent } from '@ng-nest/ui/input';
import { DOCUMENT, DatePipe } from '@angular/common';
import {
  Overlay,
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  OverlayRef
} from '@angular/cdk/overlay';
import { filter, map, takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nDatePicker, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XDatePickerPrefix}`,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, XInputComponent],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XDatePickerComponent), DatePipe]
})
export class XDatePickerComponent extends XDatePickerProperty implements OnInit, OnChanges {
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private datePipe = inject(DatePipe);
  private i18n = inject(XI18nService);
  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);

  inputCom = viewChild.required('inputCom', { read: XInputComponent });

  modelType = signal<XDatePickerModelType>('date');
  numberValue = signal<number | string | null>(null);
  isInput = signal(false);

  override writeValue(value: any) {
    if (XIsDate(value)) {
      this.modelType.set('date');
      this.numberValue.set(value.getTime());
    } else if (XIsNumber(value)) {
      this.modelType.set('number');
      this.numberValue.set(value);
    } else if (XIsString(value)) {
      this.modelType.set('string');
      const valueTime = new Date(value).getTime();
      this.numberValue.set(!isNaN(valueTime) ? valueTime : '');
    } else if (XIsEmpty(value) || XIsNull(value)) {
      this.numberValue.set('');
    }
    this.value.set(value);
    this.setDisplayValue(this.numberValue()!);
  }

  enter = signal(false);
  inputClearable = signal(false);
  animating = signal(false);
  displayValue = signal('');
  portal!: XPortalOverlayRef<XDatePickerPortalComponent>;
  icon = signal('fto-calendar');
  closeSubject: Subject<void> = new Subject();
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.datePicker as XI18nDatePicker)), {
    initialValue: zh_CN.datePicker
  });
  document = inject(DOCUMENT);

  private unSubject = new Subject<void>();
  private realPlacement = signal<XPlacement | null>(null);
  portalComponent = signal<ComponentRef<XDatePickerPortalComponent> | null>(null);
  portalOverlayRef = signal<OverlayRef | null>(null);

  placeholderSignal = computed(() => {
    if (this.placeholder()) return this.placeholder();
    if (this.type() === 'month') {
      return this.locale().selectMonth;
    } else if (this.type() === 'quarter') {
      return this.locale().selectQuarter;
    } else if (this.type() === 'year') {
      return this.locale().selectYear;
    } else if (this.type() === 'week') {
      return this.locale().selectWeek;
    } else {
      return this.locale().selectDate;
    }
  });

  formatSignal = computed(() => {
    if (this.format() !== 'yyyy-MM-dd') return this.format();
    if (this.type() === 'date') {
      return 'yyyy-MM-dd';
    } else if (this.type() === 'year') {
      return 'yyyy';
    } else if (this.type() === 'quarter') {
      return 'yyyy-MM-dd';
    } else if (this.type() === 'month') {
      return 'yyyy-MM';
    } else if (this.type() === 'date-time') {
      return 'yyyy-MM-dd HH:mm:ss';
    } else if (this.type() === 'date-hour') {
      return 'yyyy-MM-dd HH';
    } else if (this.type() === 'date-minute') {
      return 'yyyy-MM-dd HH:mm';
    }
    return this.format();
  });

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('value', this.numberValue()));
    effect(() => this.portalComponent()?.setInput('placement', this.realPlacement()));
    effect(() => this.portalComponent()?.setInput('type', this.type()));
    effect(() => this.portalComponent()?.setInput('preset', this.preset()));
    effect(() => this.portalComponent()?.setInput('extraFooter', this.extraFooter()));
    effect(() => this.portalComponent()?.setInput('inputCom', this.inputCom()));
    effect(() => this.portalComponent()?.setInput('disabledDate', this.disabledDate()));
    effect(() => this.portalComponent()?.setInput('disabledTime', this.disabledTime()));
  }

  ngOnInit() {
    this.setSubject();
    this.setParantScroll();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { type } = changes;
    if (XIsChange(type)) {
      this.setDisplayValue(this.numberValue()!);
    }
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
    if (!this.clearable()) return;
    if (!XIsEmpty(this.numberValue())) {
      this.icon.set('');
      this.inputClearable.set(true);
    }
  }

  mleave() {
    if (this.disabledComputed()) return;
    this.enter.set(false);
    if (!this.clearable()) return;
    if (this.inputClearable()) {
      this.icon.set('fto-calendar');
      this.inputClearable.set(false);
    }
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
          this.portal?.overlayRef?.updatePosition();
          const eract = this.elementRef.nativeElement.getBoundingClientRect();
          const frect = firstScroll!.getBoundingClientRect();
          if (eract.top + eract.height - frect.top < 0 || eract.bottom > frect.bottom) {
            this.closeSubject.next();
          }
        });
    }
  }

  clearEmit() {
    this.value.set(null);
    this.numberValue.set(null);
    this.displayValue.set('');
    this.mleave();
    this.modelChange();
  }

  modelChange() {
    if (this.onChange) {
      this.onChange(this.getValue());
    }
    this.formControlValidator();
  }

  getValue() {
    if (this.numberValue() === '') return null;
    return ['date', 'string'].includes(this.modelType()) ? new Date(this.numberValue()!) : this.numberValue();
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.active.set(false);
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
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
      content: XDatePickerPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.portal.overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this.unSubject))
      .subscribe(() => {
        this.setDisplayValue(this.numberValue()!);
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
    nodeClick.subscribe((x) => this.onNodeClick(x.date, x.sure));
    animating.subscribe((ing) => this.animating.set(ing));
  }

  onNodeClick(date: Date, sure = true) {
    this.isInput.set(false);
    if (sure) {
      this.numberValue.set(date.getTime());
      this.value.set(this.getValue());
      this.setDisplayValue(this.numberValue()!);
      this.closeSubject.next();
      this.modelChange();
      this.nodeEmit.emit(Number(this.numberValue()));
    } else {
      this.setDisplayValue(date.getTime());
    }
  }

  onInput() {
    this.isInput.set(true);
  }

  setDisplayValue(dateNumber: number | string) {
    if (this.isInput() && !isNaN(Date.parse(this.displayValue())) && !['week', 'quarter'].includes(this.type())) {
      this.displayValue.set(this.datePipe.transform(this.displayValue(), this.formatSignal())!);
      this.numberValue.set(new Date(this.displayValue()).getTime());
      this.value.set(this.getValue());
      this.modelChange();
      this.isInput.set(false);
    } else {
      if (this.type() === 'week') {
        this.displayValue.set(XDateYearWeek(dateNumber));
      } else if (this.type() === 'quarter') {
        this.displayValue.set(XDateYearQuarter(dateNumber));
      } else {
        this.displayValue.set(this.datePipe.transform(dateNumber, this.formatSignal())!);
      }
    }
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom().inputRef(),
      placement: [this.placement() as XCorner, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-date-picker-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portalOverlayRef()?.updatePositionStrategy(this.setPlacement());
  }

  formControlChanges() {
    this.ngOnInit();
  }
}

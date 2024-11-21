import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  inject,
  signal,
  viewChild,
  ComponentRef,
  effect,
  computed
} from '@angular/core';
import { XAutoCompleteNode, XAutoCompleteProperty, XAutoCompletePrefix } from './auto-complete.property';
import {
  XIsEmpty,
  XIsObservable,
  XIsChange,
  XSetData,
  XPositionTopBottom,
  XIsFunction,
  XParents,
  XPlacement
} from '@ng-nest/ui/core';
import { XPortalService, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { XAutoCompletePortalComponent } from './auto-complete-portal.component';
import {
  Overlay,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { DOWN_ARROW, UP_ARROW, ENTER, MAC_ENTER, ESCAPE } from '@angular/cdk/keycodes';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { DOCUMENT } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XAutoCompletePrefix}`,
  imports: [FormsModule, ReactiveFormsModule, XInputComponent],
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XAutoCompleteComponent)]
})
export class XAutoCompleteComponent extends XAutoCompleteProperty implements OnInit, OnChanges {
  inputCom = viewChild.required('inputCom', { read: XInputComponent });

  nodes = signal<XAutoCompleteNode[]>([]);
  searchNodes = signal<XAutoCompleteNode[]>([]);
  icon = signal('');
  iconSpin = signal(false);
  animating = signal(false);

  valueTplContextSignal = signal<{ $node: any; $isValue: boolean }>({ $node: null, $isValue: true });
  valueTplContextComputed = computed(() => {
    return this.valueTplContext() ? this.valueTplContext() : this.valueTplContextSignal();
  });

  inputChange = new BehaviorSubject<any>(null);
  closeSubject: Subject<void> = new Subject();
  keydownSubject: Subject<KeyboardEvent> = new Subject();
  private unSubject = new Subject<void>();
  private document = inject(DOCUMENT);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);

  private realPlacement = signal<XPlacement | null>(null);
  portalComponent = signal<ComponentRef<XAutoCompletePortalComponent> | null>(null);
  portalOverlayRef = signal<OverlayRef | null>(null);
  inputChanged = toSignal(this.inputChange.pipe(filter((x) => x !== null)));

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('value', this.value()));
    effect(() => this.portalComponent()?.setInput('placement', this.realPlacement()));
    effect(() => this.portalComponent()?.setInput('data', this.searchNodes()));
    effect(() => this.portalComponent()?.setInput('nodeTpl', this.nodeTpl()));
    effect(() => this.portalComponent()?.setInput('caseSensitive', this.caseSensitive()));
    effect(() => this.portalComponent()?.setInput('inputCom', this.inputCom()));
    effect(() => this.portalComponent()?.setInput('keywordText', this.inputChanged()));
  }

  ngOnInit() {
    this.setSubject();
    this.setParantScroll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngAfterViewInit() {
    this.setPortal();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
  }

  setData() {
    if (XIsObservable(this.data()) || XIsFunction(this.data())) return;
    XSetData<XAutoCompleteNode>(this.data(), this.unSubject).subscribe((x) => {
      this.nodes.set(x);
      this.searchNodes.set(x);
      this.setPortal();
    });
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.closePortal();
    });
    this.inputChange
      .pipe(
        filter((x) => x !== null),
        debounceTime(this.debounceTime() as number),
        distinctUntilChanged(),
        takeUntil(this.unSubject)
      )
      .subscribe((x) => {
        this.modelChange(x);
      });
    this.keydownSubject.pipe(takeUntil(this.unSubject)).subscribe((x) => {
      const keyCode = x.keyCode;
      if (!this.portalAttached() && [DOWN_ARROW, UP_ARROW, ENTER, MAC_ENTER].includes(keyCode)) {
        this.inputChange.next(this.value());
      }
      if (this.portalAttached() && [ESCAPE].includes(keyCode)) {
        this.closeSubject.next();
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

  portalAttached() {
    return this.portalOverlayRef()?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portalOverlayRef()?.detach();
      this.active.set(false);
      if (this.onlySelect()) {
        if (
          !this.nodes()
            .map((x) => x.label)
            .includes(this.value())
        ) {
          this.value.set('');
          if (this.onChange) this.onChange(this.value());
          this.inputChange.next(this.value());
        }
      }
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portalOverlayRef()?.dispose();
  }

  showPortal() {
    if (XIsEmpty(this.value()) || this.disabledComputed() || this.iconSpin() || this.animating()) return;
    this.active.set(true);
    if ((XIsObservable(this.data()) && this.nodes.length === 0) || XIsFunction(this.data())) {
      this.icon.set('fto-loader');
      this.iconSpin.set(true);
      XSetData<XAutoCompleteNode>(this.data(), this.unSubject, true, this.value()).subscribe((x) => {
        this.icon.set('');
        this.iconSpin.set(false);
        this.nodes.set(x);
        this.createPortal();
      });
    } else {
      this.createPortal();
    }
  }

  createPortal() {
    this.nodes()
      .filter((x) => x.selected)
      .map((x) => (x.selected = false));
    if (XIsFunction(this.data())) {
      this.searchNodes.set(this.nodes());
    } else if (!XIsEmpty(this.value())) {
      this.setSearchNodes(this.value());
    }
    const box = this.inputCom().inputRef().nativeElement.getBoundingClientRect();
    const config: OverlayConfig = {
      backdropClass: '',
      width: box.width,
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    const portal = this.portalService.attach({
      content: XAutoCompletePortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    let { componentRef, overlayRef } = portal;
    if (!componentRef || !overlayRef) return;
    this.portalComponent.set(componentRef);
    this.portalOverlayRef.set(overlayRef);
    this.realPlacement.set(this.placement());
    overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this.unSubject))
      .subscribe(() => {
        this.closeSubject.next();
      });
    const { animating, nodeClick } = componentRef.instance;
    animating.subscribe((ing: boolean) => this.animating.set(ing));
    nodeClick.subscribe((node: XAutoCompleteNode) => this.onNodeClick(node));
    Object.assign(componentRef.instance, {
      closeSubject: this.closeSubject,
      keydownSubject: this.keydownSubject
    });
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this.unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPositionTopBottom;
      if (place !== this.realPlacement()) {
        this.realPlacement.set(place);
        this.portalOverlayRef()?.updatePosition();
      }
    });
  }

  onNodeClick(node: XAutoCompleteNode) {
    if (this.value() === node.label) {
      this.nodeEmit.emit(node);
      this.closeSubject.next();
      return;
    }
    this.value.set(node.label);
    this.valueTplContextSignal.update((x) => {
      x.$node = node;
      return { ...x };
    });
    this.inputCom().inputFocus();
    if (this.onChange) this.onChange(this.value());
    this.nodeEmit.emit(node);
    this.closeSubject.next();
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom().inputRef(),
      placement: [this.placement() as XPositionTopBottom, 'bottom-start', 'bottom-end', 'top-start', 'top-end'],
      transformOriginOn: 'x-auto-complete-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portalOverlayRef()?.updatePositionStrategy(this.setPlacement());
  }

  setSearchNodes(value: string | number) {
    if (this.caseSensitive()) {
      this.searchNodes.set(this.nodes().filter((x) => x.label.indexOf(value) >= 0));
    } else {
      this.searchNodes.set(
        this.nodes().filter((x) => (x.label as string).toLowerCase().indexOf((value as string).toLowerCase()) >= 0)
      );
    }
  }

  modelChange(value: string | number) {
    if (XIsFunction(this.data())) {
      if (!this.portalAttached()) {
        this.showPortal();
      } else {
        if (XIsEmpty(value)) {
          this.closeSubject.next();
        } else {
          this.icon.set('fto-loader');
          this.iconSpin.set(true);
          XSetData<XAutoCompleteNode>(this.data(), this.unSubject, true, value as any).subscribe((x) => {
            this.icon.set('');
            this.iconSpin.set(false);
            this.nodes.set(x);
            this.searchNodes.set(this.nodes());
          });
        }
      }
      if (!this.onlySelect()) {
        this.onChange && this.onChange(value);
      }
      return;
    }
    if (this.nodes()) {
      if (!this.portalAttached()) {
        this.showPortal();
      } else {
        if (XIsEmpty(value)) {
          this.closeSubject.next();
        } else {
          this.setSearchNodes(value);
        }
      }
    }
    if (!this.onlySelect) {
      this.onChange && this.onChange(value);
    }
  }

  onKeydown($event: KeyboardEvent) {
    this.keydownSubject.next($event);
  }

  onInput(_event: Event) {
    this.formControlValidator();
    setTimeout(() => {
      this.inputChange.next(this.value());
    });
  }
}

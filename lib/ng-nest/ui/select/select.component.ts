import { Subject, fromEvent } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ViewContainerRef,
  TemplateRef,
  inject,
  AfterViewInit,
  OnDestroy,
  viewChild,
  computed,
  signal,
  ComponentRef,
  effect
} from '@angular/core';
import { XSelectNode, XSelectProperty, XSelectPrefix } from './select.property';
import {
  XIsEmpty,
  XIsObservable,
  XIsChange,
  XSetData,
  XPositionTopBottom,
  XIsObjectArray,
  XIsFunction,
  XIsArray,
  XIsString,
  XRemove,
  XResize,
  XPlacement,
  XComputed,
  XResizeObserver,
  XParents
} from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { XSelectPortalComponent } from './select-portal.component';
import {
  Overlay,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { takeUntil, throttleTime, debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import {
  DOWN_ARROW,
  UP_ARROW,
  ENTER,
  MAC_ENTER,
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  TAB,
  BACKSPACE
} from '@angular/cdk/keycodes';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nSelect, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { DOCUMENT } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XTagComponent } from '@ng-nest/ui/tag';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XSelectPrefix}`,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, XTagComponent, XInputComponent, XOutletDirective],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSelectComponent)]
})
export class XSelectComponent extends XSelectProperty implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private i18n = inject(XI18nService);
  document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  override cdr = inject(ChangeDetectorRef);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);

  inputCom = viewChild.required<XInputComponent>('inputCom');
  select = viewChild.required<ElementRef<HTMLElement>>('select');
  multipleValueTpl = viewChild.required<TemplateRef<void>>('multipleValueTpl');
  multipleInput = viewChild<XInputComponent>('multipleInput');

  getReadonly = computed(() => (this.readonly() && !this.search()) || (this.search() && this.multiple()));
  getMaxTagContent = computed(() => this.maxTagContent() || this.locale().maxTagContent);

  noPortalWidthPlacements: XPlacement[] = ['bottom', 'top'];
  hasPortalWidthPlacements: XPlacement[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];

  override writeValue(value: any) {
    if (this.multiple()) {
      if (XIsEmpty(value)) {
        value = [];
      }
      if (!XIsArray(value)) {
        value = [value];
      }
    }
    this.value.set(value);
    this.setDisplayValue();
  }

  enter = signal(false);
  showClearable = signal(false);
  displayValue = signal('');
  multipleSearchValue = signal('');
  nodes = signal<XSelectNode[]>([]);
  selectedNodes = signal<XSelectNode[]>([]);
  displayNodes = signal<XSelectNode[]>([]);
  displayMore = signal('');
  showDisplayMore = signal(false);
  searchNodes = signal<XSelectNode[]>([]);
  portal!: XPortalOverlayRef<XSelectPortalComponent>;
  icon = signal('fto-chevron-down');
  iconSpin = signal(false);
  animating = signal(false);
  objectArray = signal(false);
  selectedSurplus = signal(0);
  selectedTotal = signal(0);
  composition = signal(false);
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.select as XI18nSelect)), { initialValue: zh_CN.select });
  closeSubject: Subject<void> = new Subject();
  keydownSubject: Subject<KeyboardEvent> = new Subject();
  inputChange: Subject<any> = new Subject();
  multipleInputSizeChange = new Subject<number>();
  private unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;

  valueTplSignal = computed(() => {
    if (this.multiple()) {
      return this.multipleValueTpl();
    }
    return this.valueTpl();
  });

  valueTplContextSignal = signal<{ $node: any; $isValue: boolean }>({ $node: null, $isValue: true });
  placements = computed(() => {
    let placement = this.placement();
    if (this.portalWidth()) {
      if (placement === 'bottom') {
        placement = 'bottom-start';
      }
      return [placement, ...this.hasPortalWidthPlacements];
    } else {
      return [placement, ...this.noPortalWidthPlacements];
    }
  });

  private realPlacement = signal<XPlacement | null>(null);
  portalComponent = signal<ComponentRef<XSelectPortalComponent> | null>(null);
  portalOverlayRef = signal<OverlayRef | null>(null);
  inputChanged = toSignal(this.inputChange);
  portalData = computed(() => {
    const nodes = this.nodes();
    if (XIsFunction(this.data())) return nodes;
    if (XIsEmpty(this.inputChanged())) return nodes;
    return this.searchNodes();
  });

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('data', this.portalData()));
    effect(() => this.portalComponent()?.setInput('value', this.value()));
    effect(() => this.portalComponent()?.setInput('placement', this.realPlacement()));
    effect(() => this.portalComponent()?.setInput('multiple', this.multiple() === true ? 0 : 1));
    effect(() => this.portalComponent()?.setInput('nodeTpl', this.nodeTpl()));
    effect(() => this.portalComponent()?.setInput('inputCom', this.inputCom()));
    effect(() => this.portalComponent()?.setInput('portalMaxHeight', this.portalMaxHeight()));
    effect(() => this.portalComponent()?.setInput('objectArray', this.objectArray()));
    effect(() => this.portalComponent()?.setInput('selectAll', this.selectAll()));
    effect(() => this.portalComponent()?.setInput('selectAllText', this.selectAllText()));
    effect(() => this.portalComponent()?.setInput('caseSensitive', this.caseSensitive()));
    effect(() => this.portalComponent()?.setInput('search', this.search()));
    effect(() => this.portalComponent()?.setInput('virtualScroll', this.virtualScroll()));
    effect(() => this.portalComponent()?.setInput('size', this.size()));
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
    if (this.multiple() && this.inputCom().inputValueRef()) {
      XResize(this.inputCom().inputValueRef()?.nativeElement)
        .pipe(debounceTime(30), takeUntil(this.unSubject))
        .subscribe((x) => {
          this.resizeObserver = x.resizeObserver;
          this.setMutipleInputSize();
        });
    }
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.resizeObserver?.disconnect();
  }

  setData() {
    if (this.async()) return;
    XSetData<XSelectNode>(this.data(), this.unSubject).subscribe((x) => {
      this.nodes.set(x);
      this.setDisplayValue();
      this.setPortal();
    });
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.closePortal();
    });
    this.inputChange
      .pipe(debounceTime(this.debounceTime() as number), distinctUntilChanged(), takeUntil(this.unSubject))
      .subscribe((x) => {
        this.modelChange(x);
      });
    this.keydownSubject.pipe(throttleTime(10), takeUntil(this.unSubject)).subscribe((x) => {
      const keyCode = x.keyCode;
      if (
        !this.portalAttached() &&
        [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, MAC_ENTER, BACKSPACE].includes(keyCode)
      ) {
        this.inputChange.next(this.displayValue());
      }
      if (this.portalAttached() && [ESCAPE].includes(keyCode)) {
        this.closeSubject.next();
      }
    });
    this.multipleInputSizeChange.pipe(distinctUntilChanged(), takeUntil(this.unSubject)).subscribe((x) => {
      if (this.multipleInput()) {
        const input = this.multipleInput()?.elementRef.nativeElement;
        this.renderer.setStyle(input, 'width', `${x}px`);
      }
    });
  }

  setMutipleInputSize() {
    const ivf = this.inputCom().inputValueRef()?.nativeElement as HTMLDivElement;
    let { clientWidth, scrollHeight } = ivf;
    const len = ivf.children.length;
    let lastRowTagTop = -1;
    let lines = 1;
    let rowTagTop = -1;
    let lastRowTagsWidth = 0;
    let marginLeft = 0;
    let marginTop = 0;
    for (let i = len - 1; i >= 0; i--) {
      const ele = ivf.children[i] as HTMLElement;
      if (ele.tagName === 'X-TAG') {
        const { offsetTop, offsetWidth } = ele;
        const style = XComputed(ele);
        marginLeft = Number(style.marginLeft.replace('px', ''));
        marginTop = Number(style.marginTop.replace('px', ''));
        if (rowTagTop === -1) {
          rowTagTop = offsetTop;
        } else if (rowTagTop !== offsetTop) {
          lines++;
          rowTagTop = offsetTop;
        }
        if (lastRowTagTop === -1) {
          lastRowTagTop = offsetTop;
        }
        if (lastRowTagTop === offsetTop) {
          lastRowTagsWidth += offsetWidth + marginLeft;
        }
      }
    }
    const height = scrollHeight + (lines > 1 ? marginTop : 0);
    this.renderer.setStyle(this.inputCom().inputRef().nativeElement, 'height', `${height}px`);
    if (this.multipleInput()) {
      this.multipleInputSizeChange.next(clientWidth - lastRowTagsWidth - marginLeft);
    }
    this.portal?.overlayRef?.updatePosition();
  }

  menter() {
    if (this.disabledComputed() || !this.clearable() || this.iconSpin()) return;
    this.enter.set(true);
    if ((!this.multiple() && !XIsEmpty(this.displayValue())) || (this.multiple() && !XIsEmpty(this.displayNodes()))) {
      this.icon.set('');
      this.showClearable.set(true);
    }
  }

  mleave() {
    if (this.disabledComputed() || !this.clearable() || this.iconSpin()) return;
    this.enter.set(false);
    if (this.clearable()) {
      this.icon.set('fto-chevron-down');
      this.showClearable.set(false);
    }
  }

  modelChange(value: string | number) {
    if (XIsFunction(this.data())) {
      if (!this.portalAttached()) {
        this.showPortal();
      }
      this.icon.set('fto-loader');
      this.iconSpin.set(true);
      XSetData<XSelectNode>(this.data(), this.unSubject, true, value as any).subscribe((x) => {
        this.icon.set('');
        this.iconSpin.set(false);
        if (!this.enter() && this.clearable()) {
          this.showClearable.set(false);
        }
        this.nodes.set(x);
      });
      return;
    }
    if (this.nodes()) {
      if (!this.portalAttached()) {
        this.showPortal();
      }
      if (XIsEmpty(value)) {
        this.searchNodes.set(this.nodes());
      } else {
        this.setSearchNodes(value);
      }
    }
  }

  setSearchNodes(value: string | number) {
    if (this.caseSensitive()) {
      this.searchNodes.set(this.nodes().filter((x) => String(x.label).indexOf(String(value)) >= 0));
    } else {
      this.searchNodes.set(
        this.nodes().filter((x) => String(x.label).toLowerCase().indexOf(String(value).toLowerCase()) >= 0)
      );
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
    this.value.set(this.multiple() ? [] : '');
    this.displayValue.set('');
    this.multipleSearchValue.set('');
    this.selectedNodes.set([]);
    this.setDisplayNodes();
    this.valueTplContextSignal.update((x) => {
      x.$node = null;
      return x;
    });
    this.mleave();
    this.inputChange.next('');
    if (this.onChange) this.onChange(this.value());
  }

  setDisplayValue(clickNode?: XSelectNode) {
    if (this.nodes().length > 0) {
      if (this.multiple()) {
        if (XIsEmpty(this.value())) {
          this.value.set([]);
          this.displayValue.set('');
          this.selectedNodes.set([]);
          this.displayNodes.set([]);
          this.displayMore.set('');
          this.valueTplContextSignal.update((x) => {
            x.$node = null;
            return x;
          });
          this.setDisplayNodes();
        } else {
          let ids = [];
          let selected = [];
          if (XIsObjectArray<XSelectNode[]>(this.value())) {
            this.objectArray.set(true);
            ids = this.value().map((x: XSelectNode) => x.id);
          } else {
            this.objectArray.set(false);
            ids = this.value();
          }
          if (clickNode) {
            if (clickNode.selected) {
              this.selectedNodes.update((x) => {
                x.push(clickNode);
                return x;
              });
            } else {
              this.selectedNodes.update((x) => {
                XRemove(x, (y) => y.id === clickNode.id);
                return x;
              });
            }
          } else {
            for (let id of ids) {
              let node = this.nodes().find((x) => x.id === id);
              if (node) selected.push(node);
            }
            this.selectedNodes.set(selected);
          }
          this.setDisplayNodes();
          this.displayValue.set(
            this.selectedNodes()
              .map((x) => x.label)
              .join(',')
          );
          this.valueTplContextSignal.update((x) => {
            x.$node = [...this.selectedNodes()];
            return x;
          });
        }
      } else {
        let node = this.nodes().find((x) => x.id === this.value());
        if (node) {
          this.displayValue.set(node.label);
          this.valueTplContextSignal.update((x) => {
            x.$node = node;
            return x;
          });
        } else {
          this.displayValue.set('');
          this.valueTplContextSignal.update((x) => {
            x.$node = null;
            return x;
          });
        }
      }
    }
  }

  closeNode(event: Event, node: XSelectNode, index: number) {
    let inx = -1;
    if (XIsObjectArray<XSelectNode[]>(this.value())) {
      inx = this.value().findIndex((y: XSelectNode) => y.id === node.id);
    } else {
      inx = this.value().findIndex((y: number | string) => y === node.id);
    }
    if (inx >= 0) {
      this.value.update((x) => {
        x.splice(inx, 1);
        return x;
      });
      if (this.onChange) this.onChange(this.value());
      this.selectedNodes.update((x) => {
        x.splice(index, 1);
        return x;
      });
      this.setDisplayNodes();
    }
    event.stopPropagation();
  }

  setDisplayNodes() {
    if (!this.multiple()) return;
    const maxlen = this.selectedNodes().length;
    let len = 0;
    if (this.maxTagCount() >= 0) {
      len = maxlen > this.maxTagCount() ? this.maxTagCount() : maxlen;
    } else {
      len = maxlen;
    }
    let more = maxlen - len;
    more = more < 0 ? 0 : more;
    this.displayNodes.set(this.selectedNodes().slice(0, len));
    this.showDisplayMore.set(more > 0);
    if (XIsString(this.getMaxTagContent())) {
      this.displayMore.set(more > 0 ? (this.getMaxTagContent() as string).replace(/\{\{surplus\}\}/g, `${more}`) : '');
    } else {
      this.selectedSurplus.set(more);
      this.selectedTotal.set(maxlen);
    }
    setTimeout(() => this.setMutipleInputSize());
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.active.set(false);
      this.multipleSearchValue.set('');
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }

  showPortal(click = false) {
    if (this.disabledComputed() || this.iconSpin() || this.animating()) return;
    this.active.set(true);
    if ((this.async() && XIsObservable(this.data()) && this.nodes().length === 0) || XIsFunction(this.data())) {
      this.icon.set('fto-loader');
      this.iconSpin.set(true);
      XSetData<XSelectNode>(this.data(), this.unSubject, true, click ? '' : this.displayValue()).subscribe((x) => {
        this.icon.set('fto-chevron-down');
        this.iconSpin.set(false);
        if (!this.enter() && this.clearable()) {
          this.showClearable.set(false);
        }
        this.nodes.set(x);
        if (!this.search()) this.setDisplayValue();
        this.createPortal();
      });
    } else {
      this.createPortal();
    }
    if (this.search() && this.multiple()) {
      this.multipleInput()?.inputFocus();
    } else {
      this.inputCom().inputFocus('focus');
    }
  }

  createPortal() {
    this.nodes.update((nodes) => {
      nodes.filter((x) => x.selected).map((x) => (x.selected = false));
      return nodes;
    });
    const box = this.inputCom().inputRef().nativeElement.getBoundingClientRect();
    const config: OverlayConfig = {
      backdropClass: '',
      width: this.portalWidth() || box.width,
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XSelectPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.portal.overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this.unSubject))
      .subscribe(() => {
        this.setDisplayValue();
        this.closeSubject.next();
      });
    this.setInstance();
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

  setInstance() {
    let { componentRef, overlayRef } = this.portal;
    if (!componentRef || !overlayRef) return;
    this.portalComponent.set(componentRef);
    this.portalOverlayRef.set(overlayRef);
    this.realPlacement.set(this.placement());
    Object.assign(componentRef.instance, {
      closeSubject: this.closeSubject,
      keydownSubject: this.keydownSubject
    });
    const { nodeClick, animating } = componentRef.instance;
    nodeClick.subscribe((x) => this.nodeClick(x.node!, x.value));
    animating.subscribe((ing) => this.animating.set(ing));
  }

  nodeClick(node: XSelectNode, value?: XSelectNode[] | (string | number)[]) {
    if (this.multiple()) {
      if (node) {
        if (XIsObjectArray(value)) {
          if (node.selected) {
            this.value.update((x) => {
              x.push(node);
              return x;
            });
          } else {
            let inx = this.value().findIndex((x: XSelectNode) => x.id === node.id);
            this.value.update((x) => {
              x.splice(inx, 1);
              return x;
            });
          }
        } else if (XIsArray(value)) {
          if (node.selected) {
            this.value.update((x) => {
              x.push(node.id);
              return x;
            });
          } else {
            this.value.update((x) => {
              x.splice(x.indexOf(node.id), 1);
              return x;
            });
          }
        }
      } else {
        this.value.set(value);
      }
      if (this.multipleInput()) {
        const input = this.multipleInput()!.elementRef.nativeElement;
        this.renderer.setStyle(input, 'width', '2rem');
      }
      if (this.search() && this.multipleSearchValue() !== '') {
        this.multipleSearchValue.set('');
        this.inputChange.next('');
      }
      this.setDisplayValue(node);
    } else {
      node = node as XSelectNode;
      this.displayValue.set(node.label);
      this.valueTplContextSignal.update((x) => {
        x.$node = node;
        return x;
      });
      this.value.set(node.id);
      this.closeSubject.next();
    }
    if (this.search() && this.multiple() && this.multipleInput()) {
      this.multipleInput()!.inputFocus();
    } else {
      this.inputCom().inputFocus('focus');
    }
    if (this.onChange) this.onChange(this.value());
    this.formControlValidator();
  }

  selectAllNodes(value: XSelectNode[] | (string | number)[]) {
    this.value.set(value);
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom().inputRef(),
      placement: this.placements(),
      transformOriginOn: 'x-select-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }

  formControlChanges() {
    this.setData();
    this.ngOnInit();
    this.writeValue(this.value());
    this.ngAfterViewInit();
  }

  onKeydown($event: KeyboardEvent) {
    this.keydownSubject.next($event);
    if ($event.keyCode !== TAB && !this.search) {
      $event.preventDefault();
    }
  }

  onFocus(_event: Event) {
    if (this.search() && this.multiple() && this.multipleInput()) {
      this.multipleInput()!.inputFocus();
    } else {
      this.inputCom().inputFocus('focus');
    }
  }

  onInput(_event: InputEvent) {
    this.formControlValidator();
    setTimeout(() => this.inputChange.next(this.multiple() ? this.multipleSearchValue() : this.displayValue()));
  }
}

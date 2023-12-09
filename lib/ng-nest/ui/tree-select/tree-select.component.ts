import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
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
  ViewChild,
  TemplateRef,
  inject,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { XTreeSelectNode, XTreeSelectProperty, XTreeSelectPrefix } from './tree-select.property';
import {
  XIsEmpty,
  XIsObservable,
  XIsChange,
  XSetData,
  XClearClass,
  XConfigService,
  XPositionTopBottom,
  XIsObjectArray,
  XIsFunction,
  XIsArray,
  XIsString,
  XRemove,
  XResize,
  XComputed,
  XResizeObserver,
  XParents
} from '@ng-nest/ui/core';
import { XPortalService, XPortalOverlayRef, XPortalConnectedPosition } from '@ng-nest/ui/portal';
import { XInputComponent } from '@ng-nest/ui/input';
import { XTreeSelectPortalComponent } from './tree-select-portal.component';
import {
  Overlay,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
  OverlayConfig
} from '@angular/cdk/overlay';
import { takeUntil, throttleTime, debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { DOWN_ARROW, UP_ARROW, ENTER, MAC_ENTER, LEFT_ARROW, RIGHT_ARROW, TAB, BACKSPACE } from '@angular/cdk/keycodes';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nTreeSelect, XI18nService } from '@ng-nest/ui/i18n';
import { CommonModule, DOCUMENT } from '@angular/common';
import { XTagComponent } from '@ng-nest/ui/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XTreeSelectPrefix}`,
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XInputComponent, XTagComponent, XOutletDirective],
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTreeSelectComponent)]
})
export class XTreeSelectComponent extends XTreeSelectProperty implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('inputCom', { static: true }) inputCom!: XInputComponent;
  @ViewChild('treeSelect', { static: true }) treeSelect!: ElementRef<HTMLElement>;
  @ViewChild('multipleValueTpl', { static: true }) multipleValueTpl!: TemplateRef<void>;
  @ViewChild('multipleInput') multipleInput!: XInputComponent;

  get getReadonly() {
    return (this.readonly && !this.search) || (Boolean(this.search) && Boolean(this.multiple));
  }

  get getMaxTagContent() {
    return this.maxTagContent || this.locale.maxTagContent;
  }

  override writeValue(value: any) {
    if (this.multiple) {
      if (XIsEmpty(value)) {
        value = [];
      }
      if (!XIsArray(value)) {
        value = [value];
      }
      this.objectArray = XIsObjectArray(value);
    }
    this.value = value;
    this.setDisplayValue();
    this.valueChange.next(this.value);
    this.cdr.detectChanges();
  }

  override readonly = true;
  enter: boolean = false;
  showClearable: boolean = false;
  displayValue: any = '';
  multipleSearchValue = '';
  nodes: XTreeSelectNode[] = [];
  selectedNodes: XTreeSelectNode[] = [];
  displayNodes: XTreeSelectNode[] = [];
  displayMore = '';
  showDisplayMore = false;
  searchNodes: XTreeSelectNode[] = [];
  cloneNodes!: XTreeSelectNode[];
  portal!: XPortalOverlayRef<XTreeSelectPortalComponent>;
  icon: string = 'fto-chevron-down';
  iconSpin: boolean = false;
  box!: DOMRect;
  protalHeight!: number;
  maxNodes: number = 6;
  inputPadding = 0.4;
  protalTobottom: boolean = true;
  asyncLoading = false;
  animating = false;
  objectArray = false;
  selectedSurplus = 0;
  selectedTotal = 0;
  locale: XI18nTreeSelect = {};
  override valueTplContext: { $node: any; $isValue: boolean } = { $node: null, $isValue: true };
  valueChange: Subject<any> = new Subject();
  positionChange: Subject<any> = new Subject();
  closeSubject: Subject<void> = new Subject();
  dataChange = new BehaviorSubject<XTreeSelectNode[]>([]);
  keydownSubject: Subject<KeyboardEvent> = new Subject();
  inputChange: Subject<any> = new Subject();
  composition: boolean = false;
  multipleInputSizeChange = new Subject<number>();
  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;
  document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  override cdr = inject(ChangeDetectorRef);
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  private i18n = inject(XI18nService);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setFlex(this.treeSelect.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
    this.setSubject();
    if (this.multiple) {
      this.valueTpl = this.multipleValueTpl;
      this.inputPadding = 0.125;
    }
    this.i18n.localeChange
      .pipe(
        map((x) => x.treeSelect as XI18nTreeSelect),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
    this.setParantScroll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngAfterViewInit() {
    this.setPortal();
    if (this.multiple && this.inputCom.inputValueRef) {
      XResize(this.inputCom.inputValueRef.nativeElement)
        .pipe(debounceTime(30), takeUntil(this._unSubject))
        .subscribe((x) => {
          this._resizeObserver = x.resizeObserver;
          this.setMutipleInputSize();
        });
    }
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setData() {
    if (this.async) return;
    XSetData<XTreeSelectNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.dataChange.next(this.nodes);
      this.setDisplayValue();
      this.setPortal();
      this.cdr.detectChanges();
    });
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.closePortal();
    });
    this.inputChange
      .pipe(debounceTime(this.debounceTime as number), distinctUntilChanged(), takeUntil(this._unSubject))
      .subscribe((x) => {
        this.modelChange(x);
      });
    this.keydownSubject.pipe(throttleTime(10), takeUntil(this._unSubject)).subscribe((x) => {
      const keyCode = x.keyCode;
      if (
        !this.portalAttached() &&
        [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, MAC_ENTER, BACKSPACE].includes(keyCode)
      ) {
        this.inputChange.next(this.displayValue);
      }
      // if (this.portalAttached() && [ESCAPE].includes(keyCode)) {
      //   this.closeSubject.next();
      // }
    });
    this.multipleInputSizeChange.pipe(distinctUntilChanged(), takeUntil(this._unSubject)).subscribe((x) => {
      if (this.multipleInput) {
        const input = this.multipleInput?.elementRef.nativeElement;
        this.renderer.setStyle(input, 'width', `${x}px`);
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
          takeUntil(this._unSubject)
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

  setMutipleInputSize() {
    const ivf = this.inputCom.inputValueRef.nativeElement as HTMLDivElement;
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
    this.renderer.setStyle(this.inputCom.inputRef.nativeElement, 'height', `${height}px`);
    if (this.multipleInput) {
      this.multipleInputSizeChange.next(clientWidth - lastRowTagsWidth - marginLeft);
    }
    this.portal?.overlayRef?.updatePosition();
  }

  menter() {
    this.enter = true;
    if (this.disabled || !this.clearable || this.iconSpin) return;
    if (!XIsEmpty(this.displayValue)) {
      this.icon = '';
      this.showClearable = true;
      this.cdr.detectChanges();
    }
  }

  mleave() {
    this.enter = false;
    if (this.disabled || !this.clearable || this.iconSpin) return;
    if (this.clearable) {
      this.icon = 'fto-chevron-down';
      this.showClearable = false;
      this.cdr.detectChanges();
    }
  }

  modelChange(value: string | number) {
    if (XIsFunction(this.data)) {
      if (!this.portalAttached()) {
        this.showPortal();
      }
      this.icon = 'fto-loader';
      this.iconSpin = true;
      this.cdr.detectChanges();
      XSetData<XTreeSelectNode>(this.data, this._unSubject, true, value as any).subscribe((x) => {
        this.icon = '';
        this.iconSpin = false;
        if (!this.enter && this.clearable) {
          this.showClearable = false;
        }
        this.nodes = x;
        this.dataChange.next(this.nodes);
        this.cdr.detectChanges();
      });
      return;
    }
    if (this.nodes) {
      if (!this.portalAttached()) {
        this.showPortal();
      }
      if (XIsEmpty(value)) {
        this.searchNodes = [
          ...this.nodes.map((x) => {
            let res = { ...x };
            delete res.children;
            delete res.childrenLoaded;
            delete res.leaf;
            return res;
          })
        ];
      } else {
        this.setSearchNodes(value);
      }
      this.dataChange.next(this.searchNodes);
    }
  }

  setSearchNodes(value: string | number) {
    let nodes: XTreeSelectNode[] = [];
    const getParent = (node: XTreeSelectNode) => {
      if (XIsEmpty(node.pid)) return;
      const parent = this.nodes.find((x) => x.id === node.pid) as XTreeSelectNode;
      parent.open = true;
      if (!XIsEmpty(parent)) {
        if (nodes.every((x) => x.id !== parent.id)) {
          nodes.push(parent);
        }
      }
    };
    if (this.caseSensitive) {
      nodes = this.nodes.filter((x) => x.label.indexOf(value) >= 0);
    } else {
      nodes = this.nodes.filter((x) => (x.label as string).toLowerCase().indexOf((value as string).toLowerCase()) >= 0);
    }
    for (let node of nodes) {
      getParent(node);
    }
    this.searchNodes = nodes.map((x) => {
      let res = { ...x };
      delete res.children;
      delete res.childrenLoaded;
      delete res.leaf;
      return res;
    });
  }

  clearEmit() {
    this.value = this.multiple ? [] : '';
    this.displayValue = '';
    this.multipleSearchValue = '';
    this.selectedNodes = [];
    this.setDisplayNodes();
    this.valueTplContext.$node = null;
    this.mleave();
    this.valueChange.next(this.value);
    this.inputChange.next('');
    if (this.onChange) this.onChange(this.value);
  }

  setDisplayValue(clickNode?: XTreeSelectNode) {
    if (this.nodes.length > 0) {
      if (this.multiple) {
        if (XIsEmpty(this.value)) {
          this.value = [];
          this.displayValue = '';
          this.selectedNodes = [];
          this.displayNodes = [];
          this.displayMore = '';
          this.valueTplContext.$node = null;
          this.setDisplayNodes();
        } else {
          let ids = [];
          let selected = [];
          if (this.objectArray) {
            ids = this.value.map((x: XTreeSelectNode) => x.id);
          } else {
            ids = this.value;
          }
          if (clickNode) {
            let inx = this.selectedNodes.findIndex((x: XTreeSelectNode) => x.id === clickNode.id);
            if (inx >= 0) {
              XRemove(this.selectedNodes, (x) => x.id === clickNode.id);
            } else {
              this.selectedNodes.push(clickNode);
            }
          } else {
            for (let id of ids) {
              let node = this.nodes.find((x) => x.id === id);
              if (node) selected.push(node);
            }
            this.selectedNodes = selected;
          }
          if (this.showPath) {
            for (let node of this.selectedNodes) {
              const parents = this.getParentPath(node);
              node.path = parents.map((x) => x.label).join(this.separator);
            }
          }
          this.setDisplayNodes();
          this.displayValue = this.selectedNodes.map((x) => x.label).join(this.separator);
          this.valueTplContext.$node = [...this.selectedNodes];
        }
      } else {
        let node = this.nodes.find((x) => x.id === this.value);
        if (node) {
          if (this.showPath) {
            const parents = this.getParentPath(node);
            this.displayValue = parents.map((x) => x.label).join(this.separator);
          } else {
            this.displayValue = node.label;
          }
          this.valueTplContext.$node = node;
        } else {
          this.displayValue = '';
          this.valueTplContext.$node = null;
        }
      }
      this.cdr.detectChanges();
    }
  }

  getParentPath(node: XTreeSelectNode) {
    let res: XTreeSelectNode[] = [node];
    const getParent = (nd: XTreeSelectNode) => {
      let parent = this.nodes.find((x) => nd.pid && x.id === nd.pid);
      if (parent) {
        res = [parent, ...res];
        getParent(parent);
      }
    };
    getParent(node);

    return res;
  }

  closeNode(event: Event, node: XTreeSelectNode, index: number) {
    let inx = -1;
    if (this.objectArray) {
      inx = this.value.findIndex((y: XTreeSelectNode) => y.id === node.id);
    } else {
      inx = this.value.findIndex((y: number | string) => y === node.id);
    }
    if (inx >= 0) {
      this.value.splice(inx, 1);
      this.valueChange.next(this.value);
      if (this.onChange) this.onChange(this.value);
      this.selectedNodes.splice(index, 1);
      this.setDisplayNodes();
    }
    event.stopPropagation();
  }

  setDisplayNodes() {
    if (!this.multiple) return;
    const maxlen = this.selectedNodes.length;
    let len = 0;
    if (!this.maxTagCount) {
      len = maxlen;
    } else {
      len = maxlen > Number(this.maxTagCount) ? Number(this.maxTagCount) : maxlen;
    }
    let more = maxlen - len;
    more = more < 0 ? 0 : more;
    this.displayNodes = this.selectedNodes.slice(0, len);
    this.showDisplayMore = more > 0;
    if (XIsString(this.getMaxTagContent)) {
      this.displayMore = more > 0 ? (this.getMaxTagContent as string).replace(/\{\{surplus\}\}/g, `${more}`) : '';
    } else {
      this.selectedSurplus = more;
      this.selectedTotal = maxlen;
    }
    setTimeout(() => this.setMutipleInputSize());
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal?.overlayRef?.detach();
      this.active = false;
      this.multipleSearchValue = '';
      this.cdr.detectChanges();
      return true;
    }
    return false;
  }

  destroyPortal() {
    this.portal?.overlayRef?.dispose();
  }

  showPortal(click = false) {
    if (this.disabled || this.iconSpin || this.animating) return;
    this.active = true;
    if ((this.async && XIsObservable(this.data) && this.nodes.length === 0) || XIsFunction(this.data)) {
      this.icon = 'fto-loader';
      this.iconSpin = true;
      this.inputCom.cdr.detectChanges();
      XSetData<XTreeSelectNode>(this.data, this._unSubject, true, click ? '' : this.displayValue).subscribe((x) => {
        this.icon = 'fto-chevron-down';
        this.iconSpin = false;
        if (!this.enter && this.clearable) {
          this.showClearable = false;
        }
        this.inputCom.cdr.detectChanges();
        this.nodes = x;
        this.dataChange.next(this.nodes);
        if (!this.search) this.setDisplayValue();
        this.createPortal();
        this.cdr.detectChanges();
      });
    } else {
      this.dataChange.next(this.nodes);
      this.createPortal();
    }
    if (this.search && this.multiple) {
      this.multipleInput.inputFocus();
    } else {
      this.inputCom.inputFocus();
    }
  }

  createPortal() {
    this.box = this.inputCom.inputRef.nativeElement.getBoundingClientRect();
    const config: OverlayConfig = {
      backdropClass: '',
      width: this.box.width,
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };
    this.setPosition(config);
    this.portal = this.portalService.attach({
      content: XTreeSelectPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });
    this.portal.overlayRef
      ?.outsidePointerEvents()
      .pipe(takeUntil(this._unSubject))
      .subscribe(() => {
        this.setDisplayValue();
        this.closeSubject.next();
      });
    this.setInstance();
  }

  setPosition(config: OverlayConfig) {
    let position = config.positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this._unSubject)).subscribe((pos: ConnectedOverlayPositionChange) => {
      const place = XPortalConnectedPosition.get(pos.connectionPair) as XPositionTopBottom;
      place !== this.placement && this.positionChange.next(place);
    });
  }

  setInstance() {
    let componentRef = this.portal.componentRef;
    if (!componentRef) return;
    Object.assign(componentRef.instance, {
      data: this.nodes,
      value: this.value,
      placement: this.placement,
      multiple: this.multiple,
      selectAll: this.selectAll,
      nodeTpl: this.nodeTpl,
      valueChange: this.valueChange,
      positionChange: this.positionChange,
      closeSubject: this.closeSubject,
      keydownSubject: this.keydownSubject,
      dataChange: this.dataChange,
      inputCom: this.inputCom,
      portalMaxHeight: this.portalMaxHeight,
      objectArray: this.objectArray,
      selectAllText: this.selectAllText,
      caseSensitive: this.caseSensitive,
      search: this.search,
      virtualScroll: this.virtualScroll,
      size: this.size,
      onlyLeaf: this.onlyLeaf,
      expandedLevel: this.expandedLevel,
      inputChange: this.inputChange,
      destroyPortal: () => this.destroyPortal(),
      nodeEmit: (node: XTreeSelectNode, value: XTreeSelectNode[] | (string | number)[]) => this.nodeClick(node, value),
      animating: (ing: boolean) => (this.animating = ing)
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  nodeClick(node: XTreeSelectNode, value?: XTreeSelectNode[] | (string | number)[]) {
    if (this.multiple) {
      if (this.value.length === 0) {
        this.value = value;
      }
      if (this.multipleInput) {
        const input = this.multipleInput.elementRef.nativeElement;
        this.renderer.setStyle(input, 'width', '2rem');
      }
      if (this.search && this.multipleSearchValue !== '') {
        this.multipleSearchValue = '';
        this.inputChange.next('');
        this.valueChange.next([...this.value]);
      }
      this.setDisplayValue(node);
    } else {
      node = node as XTreeSelectNode;
      if (this.showPath) {
        const parents = this.getParentPath(node);
        this.displayValue = parents.map((x) => x.label).join(this.separator);
      } else {
        this.displayValue = node.label;
      }
      this.valueTplContext.$node = node;
      this.value = node.id;
      this.closeSubject.next();
    }
    if (this.search && this.multiple) {
      this.multipleInput.inputFocus();
    } else {
      this.inputCom.inputFocus();
    }
    if (this.onChange) this.onChange(this.value);
    this.formControlValidator();
    this.cdr.detectChanges();
  }

  selectAllNodes(value: XTreeSelectNode[] | (string | number)[]) {
    this.value = value;
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.inputCom.inputRef,
      placement: [this.placement as XPositionTopBottom, 'bottom', 'top'],
      transformOriginOn: 'x-tree-select-portal'
    });
  }

  setPortal() {
    this.portalAttached() && this.portal?.overlayRef?.updatePositionStrategy(this.setPlacement());
  }

  formControlChanges() {
    this.setData();
    this.ngOnInit();
    this.writeValue(this.value);
    this.ngAfterViewInit();
    this.cdr.detectChanges();
  }

  onKeydown($event: KeyboardEvent) {
    this.keydownSubject.next($event);
    if ($event.keyCode !== TAB && !this.search) {
      $event.preventDefault();
    }
  }

  onFocus(_event: Event) {
    if (this.search && this.multiple) {
      this.multipleInput.inputFocus();
    } else {
      this.inputCom.inputFocus();
    }
  }

  onInput(_event: InputEvent) {
    this.formControlValidator();
    setTimeout(() => this.inputChange.next(this.multiple ? this.multipleSearchValue : this.displayValue));
  }
}

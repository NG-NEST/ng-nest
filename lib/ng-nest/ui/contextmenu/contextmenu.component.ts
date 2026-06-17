import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewContainerRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  computed,
  effect,
  ElementRef,
  HostListener
} from '@angular/core';
import { XContextmenuPrefix, XContextmenuNode, XContextmenuProperty } from './contextmenu.property';
import { XIsEmpty, XHasChildren, XGetChildren } from '@ng-nest/ui/core';
import { Subject } from 'rxjs';
import { XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { XContextmenuPortalComponent } from './contextmenu-portal.component';
import { takeUntil } from 'rxjs/operators';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: `${XContextmenuPrefix}`,
  imports: [],
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class XContextmenuComponent extends XContextmenuProperty implements OnInit, OnDestroy {
  private unSubject = new Subject<void>();
  private portalService = inject(XPortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);

  nodes = computed(() => {
    const data = this.data();
    if (!this.children()) {
      return data.filter((y) => XIsEmpty(y.pid)).map((y) => XGetChildren<XContextmenuNode>(data, y, 0));
    }
    return XHasChildren(data, 0);
  });

  portal!: XPortalOverlayRef<XContextmenuPortalComponent>;
  animating = signal(false);
  visibleClass = signal(false);
  isClickNodeLeaf = signal(false);
  minWidth = signal<string>('0px');
  closeSubject: Subject<void> = new Subject();
  keydownSubject: Subject<KeyboardEvent> = new Subject();

  private positionElement: HTMLElement | null = null;
  private clickPosition = signal<{ x: number; y: number } | null>(null);
  portalComponent = signal<any>(null);

  constructor() {
    super();
    effect(() => this.portalComponent()?.setInput('data', this.nodes()));
    effect(() => this.portalComponent()?.setInput('size', this.size()));
    effect(() => this.portalComponent()?.setInput('portalMaxHeight', this.portalMaxHeight()));
    effect(() => this.portalComponent()?.setInput('portalHeight', this.portalHeight()));
    effect(() => this.portalComponent()?.setInput('portalWidth', this.portalWidth()));
    effect(() => this.portalComponent()?.setInput('portalClass', this.portalClass()));
  }

  ngOnInit() {
    this.setSubject();

    // 监听全局键盘事件
    this.keydownSubject.pipe(takeUntil(this.unSubject)).subscribe((event) => {
      if (event.key === 'Escape') {
        this.closePortal();
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.removePositionElement();
  }

  @HostListener('document:contextmenu', ['$event'])
  onContextmenu(event: MouseEvent) {
    if (this.disabled()) return;

    const target = this.target();
    if (!target) return;

    // 检查点击的目标是否是我们绑定的元素
    const targetElement = target instanceof ElementRef ? target.nativeElement : target;
    if (!targetElement.contains(event.target as Node)) return;

    // 阻止默认右键菜单
    event.preventDefault();

    // 先关闭已打开的菜单
    this.closePortal();

    // 记录点击位置
    this.clickPosition.set({ x: event.clientX, y: event.clientY });

    // 创建定位元素
    this.createPositionElement(event.clientX, event.clientY);

    // 打开菜单
    this.openPortal();
  }

  @HostListener('document:click')
  onClose() {
    this.closePortal();
  }

  setSubject() {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.closePortal();
    });
  }

  openPortal() {
    if (!this.clickPosition()) return;

    this.visibleClass.set(true);

    const config: OverlayConfig = {
      backdropClass: '',
      panelClass: this.portalClass(),
      width: this.portalWidth(),
      positionStrategy: this.createPositionStrategy(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: this.minWidth()
    };

    this.portal = this.portalService.attach({
      content: XContextmenuPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });

    this.setInstance();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portal.overlayRef?.dispose();
      this.visibleClass.set(false);
      this.removePositionElement();
      return true;
    }
    return false;
  }

  portalAttached() {
    return this.portal?.overlayRef?.hasAttached();
  }

  createPositionElement(x: number, y: number) {
    this.removePositionElement();

    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.width = '0px';
    element.style.height = '0px';
    element.style.pointerEvents = 'none';
    element.className = 'x-contextmenu-position';

    document.body.appendChild(element);
    this.positionElement = element;
  }

  removePositionElement() {
    if (this.positionElement) {
      this.positionElement.remove();
      this.positionElement = null;
    }
  }

  setInstance() {
    let { componentRef, overlayRef } = this.portal;
    if (!componentRef || !overlayRef) return;

    this.portalComponent.set(componentRef);

    Object.assign(componentRef.instance, {
      closeSubject: this.closeSubject,
      keydownSubject: this.keydownSubject
    });

    const { closed, animating, nodeClick } = componentRef.instance;
    closed.subscribe(() => this.closeSubject.next());
    animating.subscribe((ing: boolean) => this.animating.set(ing));
    nodeClick.subscribe((node: XContextmenuNode) => {
      this.isClickNodeLeaf.set(node.leaf!);
      this.nodeClick.emit(node);
    });
  }

  createPositionStrategy() {
    const pos = this.clickPosition();
    if (!pos) return this.overlay.position().global();

    // 使用全局定位策略,直接设置位置
    const strategy = this.overlay.position().global();
    strategy.left(`${pos.x}px`);
    strategy.top(`${pos.y}px`);

    return strategy;
  }

  setPlacement() {
    const positionElement = this.positionElement || document.body;
    return this.portalService.setPlacement({
      elementRef: { nativeElement: positionElement } as ElementRef,
      placement: [this.placement(), 'bottom-start', 'bottom-end', 'bottom', 'top-start', 'top-end', 'top'],
      transformOriginOn: 'x-contextmenu-portal'
    });
  }
}

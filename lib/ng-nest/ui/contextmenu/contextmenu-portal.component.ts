import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  input,
  output,
  signal,
  inject,
  DestroyRef,
  viewChild,
  ViewContainerRef,
  effect,
  ComponentRef
} from '@angular/core';
import { XContextmenuNode } from './contextmenu.property';
import { Subject } from 'rxjs';
import { XListComponent } from '@ng-nest/ui/list';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XPortalOverlayRef, XPortalService } from '@ng-nest/ui/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: `x-contextmenu-portal`,
  imports: [FormsModule, XListComponent],
  templateUrl: './contextmenu-portal.component.html',
  styleUrls: ['./contextmenu-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XContextmenuPortalComponent {
  @HostBinding('animate.enter') animateEnter = 'x-connect-enter';
  @HostBinding('animate.leave') animateLeave = 'x-connect-leave';

  data = input<XContextmenuNode[]>([]);
  size = input<XSize>('medium');
  portalWidth = input<string>();
  portalHeight = input<string>();
  portalMaxHeight = input<string>();
  portalClass = input<string>();

  level = input(0);
  parentPortalComponent = input<XContextmenuPortalComponent>();

  closed = output();
  animating = output<boolean>();
  nodeClick = output<XContextmenuNode>();

  list = viewChild.required<XListComponent>('list');
  destroy = signal(false);
  closeSubject!: Subject<void>;
  keydownSubject!: Subject<KeyboardEvent>;
  active = signal(0);
  node = signal<XContextmenuNode | null>(null);
  childAnimating = signal(false);
  isKeyboardControlled = signal(true);
  private unSubject = new Subject<void>();
  private destroyRef = inject(DestroyRef);
  private portalService = inject(XPortalService);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);

  portal!: XPortalOverlayRef<XContextmenuPortalComponent>;
  portalComponent = signal<ComponentRef<XContextmenuPortalComponent> | null>(null);
  portalOverlayRef = signal<any>(null);

  constructor() {
    effect(() => this.portalComponent()?.setInput('data', this.node()?.children));
    effect(() => this.portalComponent()?.setInput('level', this.level() + 1));
    effect(() => this.portalComponent()?.setInput('size', this.size()));
    effect(() => this.portalComponent()?.setInput('portalWidth', this.portalWidth()));
    effect(() => this.portalComponent()?.setInput('parentPortalComponent', this));

    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
      this.unSubject.next();
      this.unSubject.complete();
    });
  }

  ngOnInit() {
    this.closeSubject.subscribe(() => {
      this.data() && this.data()!.length > 0 && this.list().setUnActive(this.active());
    });

    this.keydownSubject.pipe(takeUntil(this.unSubject)).subscribe((x) => {
      if (!this.isKeyboardControlled()) return;
      const keyCode = x.keyCode;
      const isRightArrow = [RIGHT_ARROW].includes(keyCode);
      const isLeftArrow = [LEFT_ARROW].includes(keyCode);

      if (isRightArrow) {
        const item = this.list().keyManager.activeItem!;
        if (item?.leaf()) {
          const node = item.node()!;
          node.event = x;
          node.component = item;
          this.isKeyboardControlled.set(false);
          this.onNodeClick(node);
        }
      }

      if (isLeftArrow && this.level() > 0) {
        this.parentPortalComponent()?.isKeyboardControlled.set(true);
        this.parentPortalComponent()?.closePortal();
      }

      this.data() && this.data()!.length > 0 && this.list().keydown(x);
    });
  }

  ngAfterViewInit() {
    this.list().keyManager.setFirstItemActive();
  }

  onNodeClick(node: XContextmenuNode) {
    this.nodeClick.emit(node);

    // 如果有子节点,显示子菜单
    if (node.children && node.children.length > 0) {
      this.showPortal(node);
    } else {
      // 叶子节点,关闭所有菜单
      this.closeSubject.next();
    }
  }

  onActive(num: number) {
    this.active.set(num);
  }

  onNodeMouseenter(node: XContextmenuNode) {
    // 鼠标悬停时展开子菜单
    if (node.children && node.children.length > 0) {
      this.showPortal(node);
    }
  }

  onNodeMouseleave() {
    // 可以在这里添加延迟关闭逻辑
  }

  portalAttached() {
    return this.portalOverlayRef()?.hasAttached();
  }

  closePortal() {
    if (this.portalAttached()) {
      this.portalOverlayRef()?.dispose();
      return true;
    }
    return false;
  }

  createPortal() {
    const config: OverlayConfig = {
      backdropClass: '',
      width: this.portalWidth(),
      panelClass: this.portalClass(),
      positionStrategy: this.setPlacement(),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    };

    this.portal = this.portalService.attach({
      content: XContextmenuPortalComponent,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: config
    });

    this.setInstance();
  }

  setInstance() {
    let { componentRef, overlayRef } = this.portal;
    if (!componentRef || !overlayRef) return;

    this.portalComponent.set(componentRef);
    this.portalOverlayRef.set(overlayRef);

    Object.assign(componentRef.instance, {
      closeSubject: this.closeSubject,
      keydownSubject: this.keydownSubject
    });

    const { closed, animating, nodeClick } = componentRef.instance;
    closed.subscribe(() => this.closePortal());
    animating.subscribe((ing: boolean) => this.childAnimating.set(ing));
    nodeClick.subscribe((node: XContextmenuNode) => this.nodeClick.emit(node));
  }

  setPlacement() {
    return this.portalService.setPlacement({
      elementRef: this.node()?.component?.getElementRef(),
      placement: ['right-start', 'right-end', 'left-start', 'left-end'],
      transformOriginOn: 'x-contextmenu-portal'
    });
  }

  showPortal(node: XContextmenuNode) {
    if (this.portalAttached() && this.node()?.id !== node.id) {
      this.portalOverlayRef()?.dispose();
    }
    this.node.set(node);
    if (!this.portalAttached()) {
      this.createPortal();
    }
  }
}

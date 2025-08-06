import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  TemplateRef,
  inject,
  model,
  input,
  viewChild,
  computed,
  output,
  HostBinding,
  HostListener,
  signal,
  DestroyRef
} from '@angular/core';
import { XTreeSelectNode, XTreeSelectOrder, XTreeSelectPortalPrefix } from './tree-select.property';
import { XConnectBaseAnimation, XIsEmpty, XPlacement, XSize } from '@ng-nest/ui/core';
import { map } from 'rxjs/operators';
import { XInputComponent } from '@ng-nest/ui/input';
import { XI18nService, XI18nTreeSelect, zh_CN } from '@ng-nest/ui/i18n';
import { XTreeComponent } from '@ng-nest/ui/tree';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XTreeSelectPortalPrefix}`,
  imports: [XTreeComponent, XEmptyComponent],
  templateUrl: './tree-select-portal.component.html',
  styleUrls: ['./tree-select-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XTreeSelectPortalComponent {
  @HostBinding('@x-connect-base-animation') public get getPlacement() {
    return this.placement();
  }
  @HostListener('@x-connect-base-animation.done', ['$event']) done() {
    if (this.destroy()) return;
    this.animating.emit(false);
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    if (this.destroy()) return;
    this.animating.emit(true);
  }

  tree = viewChild.required<XTreeComponent>('tree');
  private i18n = inject(XI18nService);

  value = model<any>();
  data = input<XTreeSelectNode[]>([]);
  placement = input<XPlacement>('bottom');
  multiple = input(false);
  nodeTpl = input<TemplateRef<any>>();
  inputCom = input<XInputComponent>();
  portalMaxHeight = input<string>('');
  objectArray = input<boolean>(false);
  caseSensitive = input<boolean>(true);
  search = input<boolean>(false);
  virtualScroll = input<boolean>(false);
  keywordText = input<any>('');
  size = input<XSize>();
  onlyLeaf = input<boolean>(false);
  expandedLevel = input<number>();
  order = input<XTreeSelectOrder[]>();
  includeChildren = input<boolean>(false);

  animating = output<boolean>();
  nodeClick = output<{ node: XTreeSelectNode; value?: XTreeSelectNode[] | (string | number)[] }>();

  isEmpty = computed(() => XIsEmpty(this.data()));

  destroy = signal(false);
  private destroyRef = inject(DestroyRef);

  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.treeSelect as XI18nTreeSelect)), {
    initialValue: zh_CN.treeSelect
  });

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
    });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  onNodeClick(node: XTreeSelectNode) {
    if (this.multiple()) {
      this.nodeClick.emit({ node, value: this.value() });
    } else {
      this.nodeClick.emit({ node });
    }
  }
}

import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  HostBinding,
  HostListener,
  TemplateRef,
  input,
  viewChild,
  model,
  output,
  signal,
  computed,
  inject,
  DestroyRef
} from '@angular/core';
import { XSelectNode, XSelectPortalPrefix } from './select.property';
import { Subject } from 'rxjs';
import { XConnectBaseAnimation, XPlacement, XSize } from '@ng-nest/ui/core';
import { map, takeUntil } from 'rxjs/operators';
import { XListComponent } from '@ng-nest/ui/list';
import { XInputComponent } from '@ng-nest/ui/input';
import { XI18nSelect, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XSelectPortalPrefix}`,
  standalone: true,
  imports: [FormsModule, XListComponent],
  templateUrl: './select-portal.component.html',
  styleUrls: ['./select-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XSelectPortalComponent implements OnInit {
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

  destroy = signal(false);
  private unSubject = new Subject<void>();
  private destroyRef = inject(DestroyRef);
  private i18n = inject(XI18nService);

  list = viewChild.required<XListComponent>('list');

  value = model<any>();
  data = input<XSelectNode[]>();
  placement = input<XPlacement>('bottom');
  multiple = input(1);
  nodeTpl = input<TemplateRef<any>>();
  inputCom = input<XInputComponent>();
  portalMaxHeight = input<string>('');
  portalHeight = input<string>('');
  objectArray = input<boolean>(false);
  selectAll = input(false);
  selectAllText = input<string>('');
  caseSensitive = input<boolean>(true);
  search = input<boolean>(false);
  virtualScroll = input<boolean>(false);
  keywordText = input<any>('');
  size = input<XSize>();

  animating = output<boolean>();
  nodeClick = output<{ node: XSelectNode | null; value?: XSelectNode[] | (string | number)[] }>();

  closeSubject!: Subject<void>;
  keydownSubject!: Subject<KeyboardEvent>;
  active = signal(-1);
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.select as XI18nSelect)), { initialValue: zh_CN.select });
  getSelectAllText = computed(() => this.selectAllText() || this.locale().selectAllText);

  ngOnInit(): void {
    this.closeSubject.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.list().setUnActive(this.active());
    });
    this.keydownSubject.pipe(takeUntil(this.unSubject)).subscribe((x) => {
      this.list().keydown(x);
    });
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
      this.unSubject.next();
      this.unSubject.complete();
    });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  onNodeClick(node: XSelectNode) {
    if (this.multiple() === 0) {
      this.nodeClick.emit({ node, value: this.value() });
    } else {
      this.nodeClick.emit({ node });
    }
  }

  onSelectAll(_isSelectAll: boolean) {
    this.nodeClick.emit({ node: null, value: this.value() });
  }

  onActive(num: number) {
    this.active.set(num);
  }

  onTabOut() {
    this.closeSubject.next();
  }
}

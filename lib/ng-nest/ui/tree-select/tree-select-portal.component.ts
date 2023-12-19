import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  HostBinding,
  HostListener,
  TemplateRef,
  ViewChild,
  inject
} from '@angular/core';
import { XTreeSelectNode, XTreeSelectPortalPrefix } from './tree-select.property';
import { BehaviorSubject, Subject } from 'rxjs';
import { XBoolean, XConnectBaseAnimation, XIsEmpty, XPositionTopBottom, XSize } from '@ng-nest/ui/core';
import { map, takeUntil } from 'rxjs/operators';
import { XInputComponent } from '@ng-nest/ui/input';
import { XI18nService, XI18nTreeSelect } from '@ng-nest/ui/i18n';
import { XTreeComponent } from '@ng-nest/ui/tree';
import { XEmptyComponent } from '@ng-nest/ui/empty';

@Component({
  selector: `${XTreeSelectPortalPrefix}`,
  standalone: true,
  imports: [XTreeComponent, XEmptyComponent],
  templateUrl: './tree-select-portal.component.html',
  styleUrls: ['./tree-select-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XTreeSelectPortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-base-animation') public placement!: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    this.animating(true);
  }

  @ViewChild('tree') tree!: XTreeComponent;
  // @ViewChild('list') list!: XListComponent;
  get isEmpty() {
    return XIsEmpty(this.data);
  }

  data!: XTreeSelectNode[];
  value: any;
  valueChange!: Subject<any>;
  positionChange!: Subject<any>;
  inputChange!: Subject<any>;
  dataChange!: BehaviorSubject<XTreeSelectNode[]>;
  animating!: Function;
  activeChange!: Function;
  destroyPortal!: Function;
  closeSubject!: Subject<void>;
  keydownSubject!: Subject<KeyboardEvent>;
  searchSubject!: BehaviorSubject<any>;
  nodeEmit!: Function;
  selectAllEmit!: Function;
  multiple!: XBoolean;
  selectAll: boolean = false;
  nodeTpl!: TemplateRef<any>;
  show: boolean = false;
  objectArray: boolean = false;
  caseSensitive: boolean = true;
  active: number = -1;
  inputCom!: XInputComponent;
  portalMaxHeight = '';
  selectAllText!: string;
  locale: XI18nTreeSelect = {};
  search: boolean = false;
  scrollNull = undefined;
  virtualScroll!: XBoolean;
  size!: XSize;
  onlyLeaf!: XBoolean;
  expandedLevel!: number;
  keywordText!: string;
  private _unSubject = new Subject<void>();

  get getSelectAllText() {
    return this.selectAllText || this.locale.selectAllText;
  }

  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(XI18nService);

  ngOnInit(): void {
    this.valueChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.value = x;
      this.cdr.detectChanges();
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.cdr.detectChanges();
    });
    this.dataChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.data = x;
      this.cdr.detectChanges();
    });
    this.closeSubject.pipe(takeUntil(this._unSubject)).subscribe(() => {
      // this.tree.setUnActive(this.active);
    });
    this.keydownSubject.pipe(takeUntil(this._unSubject)).subscribe((_x) => {
      // this.tree.keydown(x);
    });
    this.inputChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.keywordText = x;
    });
    this.i18n.localeChange
      .pipe(
        map((x) => x.treeSelect as XI18nTreeSelect),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  nodeClick(node: XTreeSelectNode) {
    if (this.multiple) {
      this.nodeEmit(node, this.value);
    } else {
      this.nodeEmit(node);
    }
  }

  onSelectAll(_isSelectAll: boolean) {
    this.nodeEmit(null, this.value);
  }

  onActive(num: number) {
    this.active = num;
  }

  // onTabOut() {
  //   this.closeSubject.next();
  // }
}

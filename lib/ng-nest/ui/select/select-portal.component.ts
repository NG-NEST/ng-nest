import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Renderer2,
  HostBinding,
  HostListener,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { XSelectNode, XSelectPortalPrefix } from './select.property';
import { BehaviorSubject, Subject } from 'rxjs';
import { XBoolean, XConnectBaseAnimation, XNumber, XPositionTopBottom, XSize } from '@ng-nest/ui/core';
import { map, takeUntil } from 'rxjs/operators';
import { XListComponent } from '@ng-nest/ui/list';
import { XInputComponent } from '@ng-nest/ui/input';
import { XI18nSelect, XI18nService } from '@ng-nest/ui/i18n';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XSelectPortalPrefix}`,
  standalone: true,
  imports: [CommonModule, FormsModule, XListComponent],
  templateUrl: './select-portal.component.html',
  styleUrls: ['./select-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XConnectBaseAnimation]
})
export class XSelectPortalComponent implements OnInit, OnDestroy {
  @HostBinding('@x-connect-base-animation') public placement!: XPositionTopBottom;
  @HostListener('@x-connect-base-animation.done', ['$event']) done(event: { toState: any }) {
    this.animating(false);
    event.toState === 'void' && this.destroyPortal();
  }
  @HostListener('@x-connect-base-animation.start', ['$event']) start() {
    this.animating(true);
  }

  @ViewChild('list') list!: XListComponent;

  data!: XSelectNode[];
  value: any;
  valueChange!: Subject<any>;
  positionChange!: Subject<any>;
  inputChange!: Subject<any>;
  dataChange!: Subject<XSelectNode[]>;
  animating!: Function;
  activeChange!: Function;
  destroyPortal!: Function;
  closeSubject!: Subject<void>;
  keydownSubject!: Subject<KeyboardEvent>;
  searchSubject!: BehaviorSubject<any>;
  nodeEmit!: Function;
  selectAllEmit!: Function;
  multiple: XNumber = 1;
  selectAll: boolean = false;
  nodeTpl!: TemplateRef<any>;
  show: boolean = false;
  objectArray: boolean = false;
  caseSensitive: boolean = true;
  active: number = -1;
  inputCom!: XInputComponent;
  portalMaxHeight = '';
  selectAllText!: string;
  locale: XI18nSelect = {};
  search: boolean = false;
  scrollNull = undefined;
  virtualScroll!: XBoolean;
  size!: XSize;
  keywordText!: string;
  private _unSubject = new Subject<void>();

  get getSelectAllText() {
    return this.selectAllText || this.locale.selectAllText;
  }

  constructor(public renderer: Renderer2, public cdr: ChangeDetectorRef, public i18n: XI18nService) {}

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
      this.list.setUnActive(this.active);
    });
    this.keydownSubject.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.list.keydown(x);
    });
    this.inputChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.keywordText = x;
    });

    this.i18n.localeChange
      .pipe(
        map((x) => x.select as XI18nSelect),
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

  nodeClick(node: XSelectNode) {
    if (this.multiple === 0) {
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

  onTabOut() {
    this.closeSubject.next();
  }
}

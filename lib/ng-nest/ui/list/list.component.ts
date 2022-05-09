import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  SimpleChanges,
  OnChanges,
  QueryList,
  ElementRef,
  ViewChild,
  HostBinding,
  HostListener,
  ViewChildren
} from '@angular/core';
import { XListPrefix, XListNode, XListProperty } from './list.property';
import { XIsChange, XSetData, XConfigService, XIsEmpty, XIsUndefined, XIsNull } from '@ng-nest/ui/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { XListOptionComponent } from './list-option.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { map, takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XI18nList, XI18nService } from '@ng-nest/ui/i18n';

@Component({
  selector: `${XListPrefix}`,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XListComponent)]
})
export class XListComponent extends XListProperty implements OnInit, OnChanges {
  nodes: XListNode[] = [];
  selectedNodes: XListNode[] = [];
  @ViewChild('listItems') listItems!: ElementRef;
  @ViewChildren(XListOptionComponent)
  options!: QueryList<XListOptionComponent>;
  keyManager!: ActiveDescendantKeyManager<XListOptionComponent>;
  isSelectAll = false;
  locale: XI18nList = {};

  @HostBinding('attr.role') role = 'listbox';
  @HostBinding('attr.tabindex') tabindex = -1;

  @HostListener('keydown', ['$event']) keydown($event: KeyboardEvent) {
    this.keyManager.onKeydown($event);
    const activeIndex = this.keyManager.activeItemIndex as number;
    if ($event.keyCode === ENTER && !XIsUndefined(activeIndex)) {
      this.setUnActive(activeIndex);
      this.onNodeClick($event, this.nodes[activeIndex]);
    }
  }

  get isEmpty() {
    return XIsEmpty(this.nodes);
  }

  get getSelectAllText() {
    return this.selectAllText || this.locale.selectAllText;
  }

  override writeValue(value: any): void {
    this.value = value;
    this.setSelected();
    this.setKeyManager();
    this.cdr.detectChanges();
  }

  private _unSubject = new Subject<void>();

  constructor(
    public renderer: Renderer2,
    public cdr: ChangeDetectorRef,
    public elementRef: ElementRef,
    public configService: XConfigService,
    private i18n: XI18nService
  ) {
    super();
  }

  ngOnInit() {
    this.i18n.localeChange
      .pipe(
        map((x) => x.list as XI18nList),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    XIsChange(data) && this.setData();
  }

  ngAfterViewInit() {
    this.initKeyManager();
  }

  ngAfterViewChecked() {}

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  private setData() {
    XSetData<XListNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
      this.setSelected();
      this.setKeyManager();
      this.cdr.detectChanges();
    });
  }

  private initKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<XListOptionComponent>(this.options).withWrap();

    this.keyManager.tabOut.pipe(takeUntil(this._unSubject)).subscribe(() => {
      this.setUnActive(this.keyManager.activeItemIndex as number);
      this.keyManagerTabOut.emit();
    });

    this.keyManager.change.pipe(takeUntil(this._unSubject)).subscribe((num: number) => {
      this.setScorllTop(num);
      this.keyManagerChange.emit(num);
    });
  }

  setScorllTop(_num: number) {
    if (!this.scrollElement) return;
    let ele = this.keyManager.activeItem!.elementRef.nativeElement as HTMLElement;
    let list = this.scrollElement;
    let min = list.scrollTop;
    let max = list.scrollTop + list.clientHeight;
    if (ele.offsetTop + ele.clientHeight > max) {
      let scrollTop = ele.offsetTop + ele.clientHeight - list.clientHeight;
      list.scrollTop = scrollTop;
    }
    if (ele.offsetTop < min) {
      list.scrollTop = ele.offsetTop;
    }
  }

  setSelected() {
    if (this.nodes.length > 0) {
      this.nodes
        .filter((x) => x.selected)
        .map((x) => {
          x.selected = false;
        });
      let valArry: any[] = [];
      if (this.value instanceof Array) {
        valArry = this.value;
        if (valArry.length === this.nodes.length) {
          this.isSelectAll = true;
        }
      } else {
        valArry = [this.value];
      }

      if (this.objectArray) {
        this.selectedNodes = this.nodes
          .filter((x) => !XIsEmpty(valArry.find((y) => !XIsUndefined(y) && !XIsNull(y) && y.id === x.id)))
          .map((x) => {
            x.selected = true;
            return x;
          });
      } else {
        this.selectedNodes = this.nodes
          .filter((x) => valArry.indexOf(x.id) > -1)
          .map((x) => {
            x.selected = true;
            return x;
          });
      }
    }
  }

  setKeyManager() {
    if (XIsUndefined(this.keyManager) || XIsUndefined(this.nodes) || this.nodes.length === 0) return;
    let activeIndex = 0;
    if (XIsUndefined(this.value) || this.value.length === 0) {
      this.keyManager.updateActiveItem(activeIndex);
      return;
    }
    let valArry: any[] = [];
    if (this.value instanceof Array) {
      valArry = this.value;
    } else {
      valArry = [this.value];
    }
    const last = valArry[valArry.length - 1];
    if (this.objectArray) {
      activeIndex = this.nodes.findIndex((x) => x.id === last.id);
    } else {
      activeIndex = this.nodes.findIndex((x) => x.id === last);
    }
    this.keyManager.updateActiveItem(activeIndex);
    this.setScorllTop(activeIndex);
  }

  onNodeClick(event: Event, node: XListNode) {
    if (XIsUndefined(node) || node.disabled) {
      event.stopPropagation();
      return;
    }
    if (node.disabled || (node.selected && this.multiple === 1)) return;
    const selected = !node.selected;
    if (selected) {
      if (this.selectedNodes.length < this.multiple || this.multiple === 0) {
        node.selected = selected;
        this.selectedNodes = [...this.selectedNodes, node];
        if (this.selectedNodes.length === this.nodes.length) {
          this.isSelectAll = true;
        }
        this.cdr.detectChanges();
      } else if (this.multiple === 1 && this.selectedNodes.length === 1) {
        node.selected = selected;
        this.selectedNodes[0].selected = false;
        this.selectedNodes[0] = node;
        this.cdr.detectChanges();
      } else {
        return;
      }
    } else {
      node.selected = selected;
      this.selectedNodes.splice(
        this.selectedNodes.findIndex((x) => x.id == node.id),
        1
      );
      this.isSelectAll = false;
    }
    if (this.multiple === 1 && this.selectedNodes.length === 1) {
      this.value = this.objectArray ? this.selectedNodes[0] : this.selectedNodes[0].id;
    } else {
      this.value = this.objectArray ? this.selectedNodes : this.selectedNodes.map((x) => x.id);
    }
    if (this.onChange) this.onChange(this.value);
    this.cdr.detectChanges();
    node.event = event;
    this.nodeClick.emit(node);
  }

  onMouseenter(event: Event, node: XListNode) {
    if (node.disabled) {
      event.stopPropagation();
      return;
    }
    node.event = event;
    this.nodeMouseenter.emit(node);
  }

  onMouseleave(event: Event, node: XListNode) {
    if (node.disabled) {
      event.stopPropagation();
      return;
    }
    node.event = event;
    this.nodeMouseleave.emit(node);
  }

  dropCdk(event: CdkDragDrop<XListNode[]>) {
    moveItemInArray(this.nodes, event.previousIndex, event.currentIndex);
    this.cdr.detectChanges();
  }

  onSelectAllNodes() {
    this.isSelectAll = !this.isSelectAll;
    if (this.isSelectAll) {
      this.nodes.map((x) => {
        x.selected = true;
        return x;
      });
      this.selectedNodes = [...this.nodes];
    } else {
      this.nodes.map((x) => {
        x.selected = false;
        return x;
      });
      this.selectedNodes = [];
    }
    this.value = this.objectArray ? this.selectedNodes : this.selectedNodes.map((x) => x.id);
    if (this.onChange) this.onChange(this.value);
    this.onSelectAll.emit(this.isSelectAll);
  }

  trackByNode(_index: number, item: XListNode) {
    return item.id;
  }

  setUnActive(num: number) {
    if (num > -1) this.nodes[num].active = false;
  }
}

import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { XTransferPrefix, XTransferNode, XTransferSource, XTransferProperty } from './transfer.property';
import { XValueAccessor, XIsChange, XIsEmpty, XSetData, XConfigService } from '@ng-nest/ui/core';
import { of, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { transferArrayItem, moveItemInArray, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: `${XTransferPrefix}`,
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTransferComponent)]
})
export class XTransferComponent extends XTransferProperty implements OnInit, OnChanges, OnDestroy {
  nodes: XTransferNode[] = [];
  left: XTransferSource = {
    list: [],
    searchList: [],
    checkedCount: 0,
    disabledButton: true
  };
  right: XTransferSource = {
    list: [],
    searchList: [],
    checkedCount: 0,
    disabledButton: true
  };
  searchInput: string = '';
  private _titles = ['List', 'Selected'];
  private _unSubject = new Subject<void>();

  writeValue(value: any): void {
    this.value = value;
    this.setList();
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setTitles();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy() {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  searchInputChange(source: XTransferSource) {
    source.list = source.searchList?.filter((x) => x.label.indexOf(source.searchInput) >= 0);
    this.cdr.detectChanges();
  }

  checkedAllChange($event: boolean, source: XTransferSource) {
    let list = (source.list?.filter((x) => !x.disabled) as XTransferNode[]).map((x) => {
      x.checked = $event;
      return x;
    });
    source.checkedCount = $event ? list.length : 0;
    source.indeterminate = $event;
    this.setButtonDisabled(source);
    this.cdr.detectChanges();
  }

  checkedChange($event: boolean, source: XTransferSource) {
    if (!$event) (source.checkedCount as number)--;
    else (source.checkedCount as number)++;
    this.setCheckedAll(source);
    this.setButtonDisabled(source);
    this.cdr.detectChanges();
  }

  move(from: XTransferSource, to: XTransferSource) {
    if (from.disabledButton) return;
    let checkedItems = from.list?.filter((x) => !XIsEmpty(x.checked)) as XTransferNode[];
    let j = 0;
    checkedItems.forEach((x) => {
      const index = from.list?.indexOf(x) as number;
      x.checked = false;
      transferArrayItem(from.list as XTransferNode[], to.list as XTransferNode[], index, j);
      j++;
    });
    from.checkedAll = false;
    from.checkedCount = 0;
    from.indeterminate = false;
    from.disabledButton = true;
    this.setSearchList(from, to);
    this.setValue();
    this.cdr.detectChanges();
  }

  dropCdk(event: CdkDragDrop<XTransferSource[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.setCheckedCount(this.left, this.right);
      this.setCheckedAll(this.left, this.right);
      this.setButtonDisabled(this.left, this.right);
    }
    this.setSearchList(this.left, this.right);
    this.setValue();
    this.cdr.detectChanges();
  }

  predicate(item: CdkDrag<XTransferNode>) {
    return !item.data.disabled;
  }

  trackByNode(index: number, item: XTransferNode) {
    return item.id;
  }

  private setCheckedAll(...sources: XTransferSource[]) {
    for (let source of sources) {
      if ((source.checkedCount as number) > 0) {
        if (source.checkedCount === source.list?.filter((x) => !x.disabled).length) {
          source.checkedAll = true;
        } else {
          source.checkedAll = false;
          source.indeterminate = true;
        }
      } else {
        source.indeterminate = false;
      }
    }
  }

  private setCheckedCount(...sources: XTransferSource[]) {
    for (let source of sources) source.checkedCount = source.list?.filter((x) => !XIsEmpty(x.checked)).length;
  }

  private setButtonDisabled(...sources: XTransferSource[]) {
    for (let source of sources) source.disabledButton = source.checkedCount === 0;
  }

  private setValue() {
    this.value = this.right.list?.map((x) => x.id) as any[];
    this.onChange(this.value);
  }

  private setSearchList(...sources: XTransferSource[]) {
    if (this.search) {
      for (let source of sources) {
        if (XIsEmpty(source.searchInput)) {
          source.searchList = [...(source.list as XTransferNode[])];
        }
      }
    }
  }

  private setData() {
    XSetData<XTransferNode>(this.data, this._unSubject).subscribe((x) => {
      this.nodes = x;
    });
  }

  private setList() {
    if (!XIsEmpty(this.value)) {
      this.left.list = this.nodes.filter((x) => this.value.indexOf(x.id) < 0);
      this.right.list = this.nodes.filter((x) => this.value.indexOf(x.id) >= 0);
    } else {
      this.left.list = this.nodes;
    }
    this.setSearchList(this.left, this.right);
    // ToDo: x-checkbox error. Attempt to use a destroyed view: detectChanges
    of(true)
      .pipe(delay(0), takeUntil(this._unSubject))
      .subscribe(() => this.cdr.detectChanges());
  }

  private setTitles() {
    if (XIsEmpty(this.titles)) {
      this.titles = this._titles;
    }
    this.left.title = this.titles[0];
    if (this.titles.length > 1) this.right.title = this.titles[1];
    this.cdr.detectChanges();
  }
}

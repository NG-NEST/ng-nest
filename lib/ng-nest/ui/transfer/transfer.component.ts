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
  Input,
  TemplateRef
} from '@angular/core';
import { XTransferPrefix, XTransferNode, XTransferSource } from './transfer.type';
import {
  XClassMap,
  XValueAccessor,
  XControlValueAccessor,
  XData,
  XIsChange,
  XIsObservable,
  XToDataConvert,
  XDataConvert,
  XIsEmpty,
  XInputBoolean,
  XIsUndefined
} from '@ng-nest/ui/core';
import { Subscription, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { transferArrayItem, moveItemInArray, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: `${XTransferPrefix}`,
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTransferComponent)]
})
export class XTransferComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() @XDataConvert() data: XData<XTransferNode[]>;
  @Input() titles: string[] = ['列表 1', '列表 2'];
  @Input() @XInputBoolean() drag?: boolean;
  @Input() @XInputBoolean() search?: boolean;
  @Input() nodeTpl?: TemplateRef<any>;
  @Input() titleTpl?: TemplateRef<any>;
  classMap: XClassMap = {};
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
  private data$: Subscription | null = null;

  writeValue(value: any): void {
    this.value = value;
    this.setList();
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super(renderer);
  }

  ngOnInit() {
    this.setClassMap();
    this.setTitles();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.data) && this.setData();
  }

  searchInputChange(source: XTransferSource) {
    source.list = source.searchList.filter(x => x.label.indexOf(source.searchInput) >= 0);
    this.cdr.detectChanges();
  }

  checkedAllChange($event, source: XTransferSource) {
    const checked = !XIsEmpty($event);
    let list = source.list.filter(x => !x.disabled);
    list.map(x => {
      x.checked = checked ? [x.id] : [];
      return x;
    });
    source.checkedCount = checked ? list.length : 0;
    source.indeterminate = checked;
    this.setButtonDisabled(source);
    this.cdr.detectChanges();
  }

  checkedChange($event, source: XTransferSource) {
    if (XIsEmpty($event)) source.checkedCount--;
    else source.checkedCount++;
    this.setCheckedAll(source);
    this.setButtonDisabled(source);
    this.cdr.detectChanges();
  }

  move(from: XTransferSource, to: XTransferSource) {
    if (from.disabledButton) return;
    let checkedItems = from.list.filter(x => !XIsEmpty(x.checked));
    let j = 0;
    checkedItems.forEach(x => {
      const index = from.list.indexOf(x);
      x.checked = [];
      transferArrayItem(from.list, to.list, index, j);
      j++;
    });
    from.checkedAll = [];
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

  private setCheckedAll(...sources: XTransferSource[]) {
    for (let source of sources) {
      if (source.checkedCount > 0) {
        if (source.checkedCount === source.list.filter(x => !x.disabled).length) {
          source.checkedAll = [true];
        } else {
          source.checkedAll = [];
          source.indeterminate = true;
        }
      } else {
        source.indeterminate = false;
      }
    }
  }

  private setCheckedCount(...sources: XTransferSource[]) {
    for (let source of sources) source.checkedCount = source.list.filter(x => !XIsEmpty(x.checked)).length;
  }

  private setButtonDisabled(...sources: XTransferSource[]) {
    for (let source of sources) source.disabledButton = source.checkedCount === 0;
  }

  private setValue() {
    this.value = this.right.list.map(x => x.id);
    this.onChange(this.value);
  }

  private setSearchList(...sources: XTransferSource[]) {
    if (this.search) {
      for (let source of sources) {
        if (XIsEmpty(source.searchInput)) {
          source.searchList = [...source.list];
        }
      }
    }
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
      });
    } else {
      this.setDataChange(this.data as XTransferNode[]);
    }
  }

  private setDataChange(nodes: XTransferNode[]) {
    this.nodes = nodes;
  }

  private setList() {
    if (!XIsEmpty(this.value)) {
      this.left.list = this.nodes.filter(x => this.value.indexOf(x.id) < 0);
      this.right.list = this.nodes.filter(x => this.value.indexOf(x.id) >= 0);
    } else {
      this.left.list = this.nodes;
    }
    this.setSearchList(this.left, this.right);
    // ToDo: x-checkbox error. Attempt to use a destroyed view: detectChanges
    this.data$ && this.data$.unsubscribe();
    this.data$ = of(true)
      .pipe(delay(0))
      .subscribe(() => this.cdr.detectChanges());
  }

  private setTitles() {
    if (!XIsEmpty(this.titles)) {
      this.left.title = this.titles[0];
      if (this.titles.length > 1) this.right.title = this.titles[1];
    }
    this.cdr.detectChanges();
  }

  setClassMap() {
    // this.classMap[`${XTransferPrefix}-${this.shadow}`] = this.shadow ? true : false;
  }
}

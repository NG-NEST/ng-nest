import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild,
  SimpleChanges,
  NgZone
} from '@angular/core';
import { XFindProperty, XFindPrefix } from './find.property';
import { XValueAccessor, XClearClass, XResize, XIsUndefined, XResultList, XIsChange } from '@ng-nest/ui/core';
import { XTableComponent, XTableRow } from '@ng-nest/ui/table';
import { XDialogComponent } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { XTreeNode, XTreeComponent } from '@ng-nest/ui/tree';

@Component({
  selector: `${XFindPrefix}`,
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XFindComponent)]
})
export class XFindComponent extends XFindProperty implements OnInit {
  @ViewChild('find', { static: true }) find: ElementRef;
  @ViewChild('dialogCom') dialogCom: XDialogComponent;
  @ViewChild('tableCom') tableCom: XTableComponent;
  @ViewChild('treeCom') treeCom: XTreeComponent;
  @ViewChild('buttonCom') buttonCom: XButtonComponent;

  private _tableRef: ElementRef;
  public get tableRef(): ElementRef {
    return this._tableRef;
  }
  @ViewChild('tableRef')
  public set tableRef(value: ElementRef) {
    this._tableRef = value;
    if (value && this.multiple) {
      this.setSubscribe();
    }
  }

  @ViewChild('treeRef') treeRef: ElementRef;

  get getEmpty() {
    return !this.temp || this.temp.length === 0;
  }

  get hasTable() {
    return this.tableColumns?.length > 0;
  }

  get hasTree() {
    return (
      (Array.isArray(this.treeData) && this.treeData.length > 0) || this.treeData instanceof Function || this.treeData instanceof Observable
    );
  }

  get hasTreeTable() {
    return this.hasTable && this.hasTree;
  }

  temp: any;
  height = 100;
  isListenSize = false;

  private _unSubject = new Subject<void>();
  private _resizeObserver: ResizeObserver;

  writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }

  constructor(public renderer: Renderer2, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.tableData) && this.setTableCheckedRow();
  }

  ngOnInit() {
    this.setFlex(this.find.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
    this.setMultiple();
    this.setWidth();
  }

  ngAfterViewInit() {
    if (this.value) this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._resizeObserver?.disconnect();
    this.temp = null;
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setSubscribe() {
    if (this.tableRef) this.isListenSize = true;
    XResize(this.tableRef?.nativeElement)
      .pipe(debounceTime(30), takeUntil(this._unSubject))
      .subscribe((x) => {
        this._resizeObserver = x.resizeObserver;
        if (this.tableRef) {
          this.height = this.tableRef.nativeElement.clientHeight;
        }
        this.cdr.detectChanges();
      });
  }

  setMultiple() {
    if (!this.multiple) return;
    if (this.hasTable) {
      this.tableColumns = [{ id: '$checked', label: '选择', rowChecked: true, type: 'checkbox', width: 60 }, ...this.tableColumns];
    }
  }

  setWidth() {
    if (XIsUndefined(this.dialogWidth)) {
      if ((this.hasTable && this.hasTree) || this.hasTable) {
        this.dialogWidth = '50rem';
      } else if (this.hasTree && this.multiple) {
        this.dialogWidth = '30rem';
      } else if (this.hasTree) {
        this.dialogWidth = '20rem';
      }
    }
  }

  showModal() {
    if (this.disabled) return;
    this.dialogVisible = true;
    this.dialogVisibleChange.emit(this.dialogVisible);
    if (this.value) {
      if (this.multiple) {
        this.temp = (this.value as Array<any>).map((x) => Object.assign({}, x));
        this.setTableCheckedRow();
      } else {
        this.tableActivatedRow = this.value;
        if (!this.hasTreeTable && this.hasTree) {
          this.treeActivatedId = this.value.id;
        }
      }
    }
    if (this.hasTable) {
      this.tableCom.virtualBody?.scrollToIndex(0);
      this.tableCom.virtualBody?.checkViewportSize();
    }
    this.cdr.detectChanges();
  }

  setTableCheckedRow() {
    if (!this.multiple || XIsUndefined(this.temp)) return;
    const ids = (this.temp as Array<any>).map((x) => x.id);
    this.tableCheckedRow = {
      ...this.tableCheckedRow,
      $checked: ids
    };
  }

  sure() {
    this.value = this.temp;
    this.onChange(this.value);
    this.cdr.detectChanges();
  }

  closeModal() {
    this.cdr.detectChanges();
  }

  dialogCloseDone() {
    if (this.hasTree) this.treeActivatedId = null;
  }

  tempClose(index: number, item: any) {
    this.temp.splice(index, 1);
    let it = this.tableCom?.tableData.find((x) => item.id === x.id);
    if (it) {
      it.$checked = false;
      this.tableCom?.bodyChange();
    }
    this.cdr.detectChanges();
  }

  tagClose(index: number = -1) {
    if (index >= 0) {
      this.value.splice(index, 1);
    } else {
      this.value = null;
      this.tableActivatedRow = null;
      if (!this.hasTreeTable && this.hasTree) {
        this.treeActivatedId = null;
      }
    }
    this.cdr.detectChanges();
  }

  tableActivatedRowChange(data: XTableRow) {
    if (this.multiple) {
      this.rowMultiple(data);
    } else {
      this.temp = data;
    }
  }

  rowMultiple(data: XTableRow) {
    if (typeof this.temp === 'undefined') this.temp = [];
    if (data.$checked) {
      this.temp = [...this.temp, data];
    } else {
      this.temp.splice(
        (this.temp as Array<any>).findIndex((x) => x.id === data.id),
        1
      );
    }
    this.cdr.detectChanges();
  }

  treeActivatedClick(node: XTreeNode) {
    if (!this.hasTreeTable && this.hasTree) {
      this.temp = node;
    } else if (this.hasTreeTable && this.treeTableConnect) {
      if (!this.tableQuery) this.tableQuery = {};
      if (!this.tableQuery.filter) this.tableQuery.filter = [];
      let field = this.tableQuery.filter.find((x) => x.field === this.treeTableConnect);
      if (field) {
        field.value = node.id;
        field.operation = '=';
      } else {
        this.tableQuery.filter = [...this.tableQuery.filter, { field: this.treeTableConnect, value: node.id, operation: '=' }];
      }
      this.tableCom.change(1);
    }
    this.treeActivatedId = node.id;
    this.treeActivatedChange.emit(node);
    this.cdr.detectChanges();
  }

  formControlChanges() {
    this.ngOnInit();
    this.ngAfterViewInit();
    this.treeCom?.setData();
    this.cdr.detectChanges();
  }
}

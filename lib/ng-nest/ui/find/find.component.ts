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
  inject,
  OnChanges,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { XFindProperty, XFindPrefix } from './find.property';
import {
  XClearClass,
  XResize,
  XIsUndefined,
  XIsChange,
  XConfigService,
  XIsEmpty,
  XResizeObserver
} from '@ng-nest/ui/core';
import { XTableComponent, XTableRow } from '@ng-nest/ui/table';
import { XDialogComponent } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { XTreeNode, XTreeComponent } from '@ng-nest/ui/tree';
import { XValueAccessor, XControlValueAccessor } from '@ng-nest/ui/base-form';
import { XTagComponent } from '@ng-nest/ui/tag';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XInputComponent } from '@ng-nest/ui/input';
import { NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: `${XFindPrefix}`,
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    XTagComponent,
    XButtonComponent,
    XDialogComponent,
    XTableComponent,
    XTreeComponent,
    XIconComponent,
    XEmptyComponent,
    XInputComponent,
    XControlValueAccessor
  ],
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XFindComponent)]
})
export class XFindComponent extends XFindProperty implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('find', { static: true }) find!: ElementRef<HTMLElement>;
  @ViewChild('dialogCom') dialogCom!: XDialogComponent;
  @ViewChild('tableCom') tableCom!: XTableComponent;
  @ViewChild('treeCom') treeCom!: XTreeComponent;
  @ViewChild('buttonCom') buttonCom!: XButtonComponent;

  private _tableRef!: ElementRef<HTMLElement>;
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

  private _treeRef!: ElementRef<HTMLElement>;
  public get treeRef(): ElementRef {
    return this._treeRef;
  }
  @ViewChild('treeRef')
  public set treeRef(value: ElementRef) {
    this._treeRef = value;
    if (value && this.multiple) {
      this.setSubscribe();
    }
  }

  get getEmpty() {
    return !this.temp || this.temp.length === 0;
  }

  get hasTable() {
    return this.tableColumns?.length > 0;
  }

  get hasTree() {
    return (
      (Array.isArray(this.treeData) && this.treeData.length > 0) ||
      this.treeData instanceof Function ||
      this.treeData instanceof Observable
    );
  }

  get hasTreeTable() {
    return this.hasTable && this.hasTree;
  }

  get hasTreeMultiple() {
    return this.hasTree && !this.hasTreeTable && this.multiple;
  }

  get hasSearch() {
    return this.search && this.hasTable;
  }

  temp: any;
  height = 100;

  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;

  override writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }

  private renderer = inject(Renderer2);
  override cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

  ngOnChanges(simples: SimpleChanges) {
    const { tableData, labelAlign, size } = simples;
    XIsChange(tableData) && this.setTableCheckedRow();
    XIsChange(labelAlign, size) && this.setClassMap();
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
  }

  setClassMap() {
    XClearClass(this.labelMap, this.classMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
    this.classMap[`x-find-${this.size}`] = !XIsEmpty(this.size);
  }

  setSubscribe() {
    let resizeRef: Element[] = [];
    if (this.hasTable) {
      resizeRef = [this.tableRef?.nativeElement];
    }
    if (this.hasTree && !this.hasTreeTable) {
      resizeRef.push(this.treeRef?.nativeElement);
    }
    this._unSubject.next();
    XResize(...resizeRef)
      .pipe(debounceTime(30), takeUntil(this._unSubject))
      .subscribe((x) => {
        this._resizeObserver = x.resizeObserver;
        if (this.tableRef) {
          this.height = this.tableRef.nativeElement.clientHeight;
        } else if (this.hasTree) {
          this.height = this.treeRef?.nativeElement.clientHeight;
        }
        this.cdr.detectChanges();
      });
  }

  setMultiple() {
    if (!this.multiple) return;
    if (this.hasTable) {
      if (!this.tableColumns.find((x) => x.rowChecked)) {
        this.tableColumns = [
          {
            id: '$checked',
            label: this.dialogCheckboxLabel,
            rowChecked: true,
            type: 'checkbox',
            width: this.dialogCheckboxWidth
          },
          ...this.tableColumns
        ];
      }
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
        this.setTreeChecked();
      } else {
        this.tableActivatedRow = this.value;
        if (!this.hasTreeTable && this.hasTree) {
          this.treeActivatedId = this.value.id;
        }
      }
    } else {
      this.temp = this.multiple ? [] : null;
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

  setTreeChecked() {
    if (this.hasTreeMultiple) this.treeChecked = this.temp.map((x: any) => x.id);
  }

  sure() {
    this.value = this.temp;
    this.onChange(this.value);
    this.formControlValidator();
    this.cdr.detectChanges();
  }

  closeModal() {
    this.cdr.detectChanges();
  }

  dialogCloseDone() {
    if (this.hasTree) {
      this.treeActivatedId = null;
      this.temp = null;
    }
  }

  tempClose(index: number, item: any) {
    this.temp.splice(index, 1);
    if (this.hasTable) {
      let it = this.tableCom?.tableData.find((x) => item.id === x.id);
      if (it) {
        it['$checked'] = false;
        this.tableCom?.bodyChange();
      }
    } else if (this.hasTree) {
      let it = this.treeCom?.treeData.find((x) => item.id === x.id);
      if (it) {
        it.checked = false;
        it.change && it.change();
        this.treeCom?.cdr.detectChanges();
      }
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
    this.onChange(this.value);
    this.formControlValidator();
    this.cdr.detectChanges();
  }

  tableActivatedRowChange(data: XTableRow) {
    if (this.multiple) {
      this.rowMultiple(data);
    } else {
      this.temp = data;
      this.dialogVisible = false;
      this.sure();
    }
  }

  rowMultiple(data: XTableRow) {
    if (typeof this.temp === 'undefined') this.temp = [];
    // data['$checked'] = !data['$checked'];
    if (data['$checked']) {
      this.temp = [...this.temp, data];
    } else {
      this.temp.splice(
        (this.temp as Array<any>).findIndex((x) => x.id === data.id),
        1
      );
    }
    this.cdr.detectChanges();
  }

  treeMultiple(node: XTreeNode) {
    if (typeof this.temp === 'undefined') this.temp = [];
    // node.$checked = !node.$checked;
    if (node.checked) {
      this.temp = [...this.temp, node];
    } else {
      this.temp.splice(
        (this.temp as Array<any>).findIndex((x) => x.id === node.id),
        1
      );
    }
    this.cdr.detectChanges();
  }

  treeActivatedClick(node: XTreeNode) {
    if (!this.hasTreeTable && this.hasTree) {
      if (this.multiple) {
        // this.treeMultiple(node);
      } else {
        this.temp = node;
      }
    } else if (this.hasTreeTable && this.treeTableConnect) {
      if (!this.tableQuery) this.tableQuery = {};
      if (!this.tableQuery.filter) this.tableQuery.filter = [];
      let field = this.tableQuery.filter.find((x) => x.field === this.treeTableConnect);
      if (field) {
        field.value = node.id;
        field.operation = '=';
      } else {
        this.tableQuery.filter = [
          ...this.tableQuery.filter,
          { field: this.treeTableConnect, value: node.id, operation: '=' }
        ];
      }
      this.tableCom.change(1);
      this.treeActivatedId = node.id;
    }
    this.treeActivatedChange.emit(node);
    this.cdr.detectChanges();
  }

  treeCheckboxChange(node: XTreeNode) {
    this.treeMultiple(node);
  }

  formControlChanges() {
    this.ngOnInit();
    this.ngAfterViewInit();
    this.treeCom?.setData();
    this.cdr.detectChanges();
  }

  searchKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchClick();
    } else if (event.key === 'Delete') {
      this.search.value = '';
    }
  }

  searchClick(): void {
    if (!this.hasSearch) {
      return;
    }

    this.tableQuery = this.tableQuery || [];
    this.tableQuery.filter = this.tableQuery.filter || [];
    const field = this.tableQuery.filter.find((x) => x.field === this.search.field);

    if (field) {
      field.value = this.search.value || '';
    } else {
      this.tableQuery.filter = [...this.tableQuery?.filter, this.search];
    }

    this.tableCom.change(1);
    this.cdr.detectChanges();
  }
}

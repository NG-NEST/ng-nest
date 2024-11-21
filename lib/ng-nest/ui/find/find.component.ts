import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  computed,
  viewChild,
  signal,
  inject
} from '@angular/core';
import { XFindProperty, XFindPrefix } from './find.property';
import {
  XResize,
  XIsUndefined,
  XIsChange,
  XResizeObserver,
  XIsEmpty,
  XToCssPx,
  XComputedStyle
} from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';
import { XDialogComponent } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { XTreeNode, XTreeComponent } from '@ng-nest/ui/tree';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { XTagComponent } from '@ng-nest/ui/tag';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XInputComponent } from '@ng-nest/ui/input';
import { DOCUMENT, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XFindPrefix}`,
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
    XInputComponent
  ],
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XFindComponent)]
})
export class XFindComponent extends XFindProperty implements OnChanges, OnDestroy {
  find = viewChild.required<ElementRef<HTMLElement>>('find');
  dialogCom = viewChild.required<XDialogComponent>('dialogCom');
  tableCom = viewChild<XTableComponent>('tableCom');
  treeCom = viewChild<XTreeComponent>('treeCom');
  buttonCom = viewChild.required<XButtonComponent>('buttonCom');
  tableRef = viewChild<ElementRef<HTMLElement>>('tableRef');
  treeRef = viewChild<ElementRef<HTMLElement>>('treeRef');

  tableRefChanged = toObservable(this.tableRef)
    .pipe(tap((x) => x && this.multiple() && this.setSubscribe()))
    .subscribe();
  treeRefChanged = toObservable(this.treeRef)
    .pipe(tap((x) => x && this.multiple() && this.setSubscribe()))
    .subscribe();

  tableColumnsSignal = computed(() => {
    if (!this.multiple()) return this.tableColumns();
    if (this.hasTable()) {
      let checkboxColumn = this.tableColumns().find((x) => x.rowChecked);
      if (!checkboxColumn) {
        return [
          {
            id: '$checked',
            label: this.dialogCheckboxLabel(),
            rowChecked: true,
            type: 'checkbox',
            width: XToCssPx(this.dialogCheckboxWidth(), this.fontSize())
          },
          ...this.tableColumns()
        ] as XTableColumn[];
      } else {
        checkboxColumn.label = this.dialogCheckboxLabel();
        checkboxColumn.width = XToCssPx(this.dialogCheckboxWidth(), this.fontSize());
      }
    }
    return this.tableColumns();
  });

  getEmpty = computed(() => !this.temp() || this.temp().length === 0);
  hasTable = computed(() => this.tableColumns().length > 0);
  hasTree = computed(
    () =>
      (Array.isArray(this.treeData()) && (this.treeData() as Array<XTreeNode>).length > 0) ||
      this.treeData() instanceof Function ||
      this.treeData() instanceof Observable
  );
  hasTreeTable = computed(() => this.hasTable() && this.hasTree());
  hasTreeMultiple = computed(() => this.hasTree() && !this.hasTreeTable() && this.multiple());
  hasSearch = computed(() => this.search() && this.hasTable());
  dialogWidthSignal = computed(() => {
    if (XIsUndefined(this.dialogWidth())) {
      if ((this.hasTable() && this.hasTree()) || this.hasTable()) {
        return '50rem';
      } else if (this.hasTree() && this.multiple()) {
        return '30rem';
      } else if (this.hasTree()) {
        return '20rem';
      }
    }
    return this.dialogWidth();
  });

  temp = signal<any>(undefined);
  height = signal(100);

  private unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;
  private document = inject(DOCUMENT);
  private fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));

  classMap = computed(() => ({
    [`${XFindPrefix}-${this.size()}`]: !!this.size(),
    [`x-justify-${this.justify()}`]: !!this.justify(),
    [`x-align-${this.align()}`]: !!this.align(),
    [`x-direction-${this.direction()}`]: !!this.direction()
  }));
  labelMapSignal = computed(() => ({
    [`x-text-align-${this.labelAlign()}`]: !!this.labelAlign()
  }));

  ngOnChanges(simples: SimpleChanges) {
    const { tableData } = simples;
    XIsChange(tableData) && this.setTableCheckedRow();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.resizeObserver?.disconnect();
  }

  setSubscribe() {
    let resizeRef: Element[] = [];
    if (this.hasTable()) {
      resizeRef = [this.tableRef()!.nativeElement];
    }
    if (this.hasTree() && !this.hasTreeTable()) {
      resizeRef.push(this.treeRef()!.nativeElement);
    }
    this.unSubject.next();
    if (resizeRef.length === 0) return;
    XResize(...resizeRef)
      .pipe(debounceTime(30), takeUntil(this.unSubject))
      .subscribe((x) => {
        this.resizeObserver = x.resizeObserver;
        if (this.tableRef()) {
          this.height.set(this.tableRef()!.nativeElement.clientHeight);
        } else if (this.hasTree()) {
          this.height.set(this.treeRef()!.nativeElement.clientHeight);
        }
      });
  }

  showModal() {
    if (this.disabledComputed()) return;
    this.dialogVisible.set(true);
    if (this.value()) {
      if (this.multiple()) {
        this.temp.set((this.value() as Array<any>).map((x) => Object.assign({}, x)));
        this.setTableCheckedRow();
        this.setTreeChecked();
      } else {
        this.tableActivatedRow.set(this.value());
        if (!this.hasTreeTable() && this.hasTree()) {
          this.treeActivatedId.set(this.value().id);
        }
      }
    } else {
      this.temp.set(this.multiple() ? [] : undefined);
    }
    if (this.hasTable()) {
      this.tableCom()?.virtualBody()?.scrollToIndex(0);
      this.tableCom()?.virtualBody()?.checkViewportSize();
    }
  }

  setTableCheckedRow() {
    if (!this.multiple() || XIsUndefined(this.temp())) return;
    const ids = (this.temp() as Array<any>).map((x) => x.id);
    this.tableCheckedRow.update((x) => ({
      ...x,
      $checked: ids
    }));
  }

  setTreeChecked() {
    if (this.hasTreeMultiple()) this.treeChecked.set(this.temp().map((x: any) => x.id));
  }

  sure() {
    this.value.set(this.temp());
    this.onChange && this.onChange(this.value());
    this.formControlValidator();
  }

  dialogCloseDone() {
    if (this.hasTree()) {
      this.treeActivatedId.set(null);
      this.temp.set(null);
    }
  }

  tempClose(index: number, item: any) {
    this.temp.update((x) => {
      x.splice(index, 1);
      return [...x];
    });
    if (this.hasTable()) {
      let it = this.tableCom()!
        .tableData()
        .find((x) => item.id === x.id);
      if (it) {
        it['$checked'] = false;
      }
    } else if (this.hasTree()) {
      let it = this.treeCom()!
        .treeData()
        .find((x) => item.id === x.id);
      if (it) {
        it.checked = false;
        it.change && it.change();
      }
    }
  }

  tagClose(index: number = -1) {
    if (index >= 0) {
      this.value.update((x) => {
        x.splice(index, 1);
        return [...x];
      });
    } else {
      this.value.set(null);
      this.tableActivatedRow.set(null);
      if (!this.hasTreeTable() && this.hasTree()) {
        this.treeActivatedId.set(null);
      }
    }
    this.onChange && this.onChange(this.value());
    this.formControlValidator();
  }

  tableActivatedRowChange(data: XTableRow) {
    if (this.multiple()) {
      this.rowMultiple(data);
    } else {
      this.temp.set(data);
      this.dialogVisible.set(false);
      this.sure();
    }
  }

  rowMultiple(data: XTableRow) {
    if (typeof this.temp() === 'undefined') this.temp.set([]);
    if (data['$checked']) {
      this.temp.update((x) => {
        if (XIsEmpty(x)) x = [];
        x.push(data);
        return x;
      });
    } else {
      this.temp.update((x) => {
        x.splice(
          x.findIndex((x: any) => x.id === data.id),
          1
        );
        return [...x];
      });
    }
  }

  treeMultiple(node: XTreeNode) {
    if (typeof this.temp() === 'undefined') this.temp.set([]);
    if (node.checked) {
      this.temp.update((x) => [...x, node]);
    } else {
      this.temp.update((x) => {
        x.splice(
          x.findIndex((x: any) => x.id === node.id),
          1
        );
        return [...x];
      });
    }
  }

  treeActivatedClick(node: XTreeNode) {
    if (!this.hasTreeTable() && this.hasTree()) {
      if (!this.multiple()) {
        this.temp.set(node);
      }
    } else if (this.hasTreeTable() && this.treeTableConnect()) {
      const tableQuery = this.tableQuery();
      if (!tableQuery.filter) tableQuery.filter = [];
      let field = tableQuery.filter.find((x) => x.field === this.treeTableConnect());
      if (field) {
        field.value = node.id;
        field.operation = '=';
      } else {
        tableQuery.filter = [...tableQuery.filter, { field: this.treeTableConnect(), value: node.id, operation: '=' }];
      }
      this.tableQuery.set(tableQuery);
      this.tableCom()!.change(1);
      this.treeActivatedId.set(node.id);
    }
  }

  treeCheckboxChange(node: XTreeNode) {
    this.treeMultiple(node);
  }

  searchKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchClick();
    } else if (event.key === 'Delete') {
      this.search.update((x) => {
        x!.value = '';
        return { ...x };
      });
    }
  }

  searchClick(): void {
    if (!this.hasSearch()) {
      return;
    }
    const tableQuery = this.tableQuery() || {};
    tableQuery.filter = tableQuery.filter || [];
    const field = tableQuery.filter.find((x) => x.field === this.search()!.field);

    if (field) {
      field.value = this.search()!.value || '';
    } else {
      tableQuery.filter = [...tableQuery.filter, this.search()!];
    }
    this.tableQuery.set(tableQuery);
    this.tableCom()!.change(1);
  }
}

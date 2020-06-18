import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild
} from '@angular/core';
import { XFindProperty, XFindPrefix } from './find.property';
import { XValueAccessor, XClearClass, XResize, XIsUndefined, XResultList } from '@ng-nest/ui/core';
import { XTableAction, XTableComponent } from '@ng-nest/ui/table';
import { XDialogComponent } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

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
  @ViewChild('buttonCom') buttonCom: XButtonComponent;
  @ViewChild('tableRef') tableRef: ElementRef;
  @ViewChild('treeRef') treeRef: ElementRef;

  get getEmpty() {
    return !this.temp || this.temp.length === 0;
  }

  get hasTable() {
    return this.tableColumns?.length > 0;
  }

  get hasTree() {
    return (Array.isArray(this.treeData) && this.treeData.length > 0) || this.treeData instanceof Observable;
  }

  get hasTreeTable() {
    return this.hasTable && this.hasTree;
  }

  temp: any;
  tableCheckedRow: { [prop: string]: any[] } = {};
  query = {};
  index = 1;
  tableSize = 10;
  data: XResultList<any>;
  height = 100;

  private _unSubject = new Subject<void>();
  private _resizeObserver: ResizeObserver;

  writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }

  constructor(public renderer: Renderer2, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.find.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
    this.setMultiple();
    this.setWidth();
  }

  ngAfterViewInit() {
    if (this.value) this.cdr.detectChanges();
    if (this.multiple) {
      this.tableAllowSelectRow = false;
      this.setSubscribe();
    }
  }

  ngOnDestroy(): void {
    this._resizeObserver?.disconnect();
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setSubscribe() {
    XResize(this.tableRef?.nativeElement, this.treeRef?.nativeElement)
      .pipe(debounceTime(30), takeUntil(this._unSubject))
      .subscribe((x) => {
        this._resizeObserver = x.resizeObserver;
        if (this.tableRef) {
          this.height = this.tableRef.nativeElement.clientHeight;
        } else if (this.treeRef) {
          this.height = this.treeRef.nativeElement.clientHeight;
        }
        this.cdr.detectChanges();
      });
  }

  setMultiple() {
    if (!this.multiple) return;
    if (this.hasTable) {
      this.tableColumns = [{ id: 'checked', label: '选择', rowChecked: true, type: 'checkbox', width: 60 }, ...this.tableColumns];
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
    if (this.value) {
      if (this.multiple) {
        this.temp = (this.value as Array<any>).map((x) => Object.assign({}, x));
        const ids = (this.temp as Array<any>).map((x) => x.id);
        this.tableCheckedRow = {
          ...this.tableCheckedRow,
          checked: ids
        };
      } else {
        this.tableActivatedRow = this.value;
        if (!this.hasTreeTable && this.hasTree) {
          this.treeActivatedId = this.value.id;
        }
      }
    }
    this.cdr.detectChanges();
  }

  sure() {
    this.value = this.temp;
    this.temp = null;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.cdr.detectChanges();
  }

  tempClose(index: number, item: any) {
    this.temp.splice(index, 1);
    let it = this.tableCom.tableData.find((x) => item.id === x.id);
    if (it) {
      it.checked = false;
      this.tableCom.cdr.detectChanges();
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

  tableActionClick(action: XTableAction) {
    this.tableActionEmit.emit(action);
  }

  tableRowClick(data: any) {
    if (this.multiple) {
      this.rowMultiple(data);
    } else {
      this.temp = data;
    }
    this.tableActivatedRow = data;
    this.tableRowEmit.emit(data);
  }

  rowMultiple(data: any) {
    if (typeof this.temp === 'undefined') this.temp = [];
    if (data.checked) {
      this.temp = [...this.temp, data];
    } else {
      this.temp.splice(
        (this.temp as Array<any>).findIndex((x) => x.id === data.id),
        1
      );
    }
    this.cdr.detectChanges();
  }

  treeActivatedClick(node: any) {
    if (!this.hasTreeTable && this.hasTree) {
      this.temp = node;
      this.treeActivatedId = node.id;
      this.treeActivatedChange.emit(node);
    }
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}

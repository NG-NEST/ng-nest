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
import { XValueAccessor, XClearClass } from '@ng-nest/ui/core';
import { XTableAction, XTableComponent } from '@ng-nest/ui/table';
import { XDialogComponent } from '@ng-nest/ui/dialog';
import { XButtonComponent } from '@ng-nest/ui/button';

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

  private _value: any;

  tableCheckedRow: { [prop: string]: any[] } = {};

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
  }

  ngAfterViewInit() {
    if (this.value) this.cdr.detectChanges();
    if (this.multiple) this.tableAllowSelectRow = false;
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setMultiple() {
    if (!this.multiple) return;
    this.tableColumns = [{ id: 'checked', label: '选择', type: 'checkbox', width: 100 }, ...this.tableColumns];
  }

  showModal() {
    if (this.disabled) return;
    this.dialogVisible = true;
    if (this.value) {
      if (this.multiple) {
        this._value = (this.value as Array<any>).map((x) => Object.assign({}, x));
        this.tableCheckedRow = {
          ...this.tableCheckedRow,
          checked: (this._value as Array<any>).map((x) => x.id)
        };
        console.log(this.tableCheckedRow);
      } else {
        this.tableActivatedRow = this.value;
      }
    }
    this.cdr.detectChanges();
  }

  sure() {
    this.value = this._value;
    this._value = null;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.cdr.detectChanges();
  }

  tagClose(index: number = -1) {
    if (index >= 0) {
      this.value.splice(index, 1);
    } else {
      this.value = null;
      this.tableActivatedRow = null;
    }

    this.cdr.detectChanges();
  }

  actionEmit(action: XTableAction) {
    this.tableActionEmit.emit(action);
  }

  rowEmit(data: any) {
    if (this.multiple) {
      this.rowMultiple(data);
    } else {
      this._value = data;
    }
    this.tableActivatedRow = data;

    this.tableRowEmit.emit(data);
  }

  rowMultiple(data: any) {
    if (typeof this._value === 'undefined') this._value = [];
    data.checked = !data.checked;
    if (data.checked) {
      this._value = [...this._value, data];
    } else {
      this._value.splice(
        (this._value as Array<any>).findIndex((x) => x.id === data.id),
        1
      );
    }
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}

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

  writeValue(value: any) {
    this.value = value;
    if (this.value) this.tableActivatedRow = this.value;
    this.cdr.detectChanges();
  }

  constructor(public renderer: Renderer2, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.find.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
  }

  ngAfterViewInit() {
    if (this.value) this.buttonCom.cdr.detectChanges();
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  showModal() {
    if (this.disabled) return;
    this.dialogVisible = true;
    this.cdr.detectChanges();
  }

  sure() {}

  change() {
    this.cdr.detectChanges();
  }

  actionEmit(action: XTableAction) {
    this.tableActionEmit.emit(action);
  }

  rowEmit(data: any) {
    this.tableActivatedRow = data;
    this.value = data;
    if (typeof this.value[this.columnLabel] === 'undefined') {
      this.value[this.columnLabel] = data[this.columnLabel];
    }
    this.buttonCom.cdr.detectChanges();
    this.tableRowEmit.emit(data);
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}

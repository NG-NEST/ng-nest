import { Directive, Input, OnInit, ViewContainerRef, TemplateRef, HostBinding, inject } from '@angular/core';
import { XTableViewService } from './table-view.service';
import { XTableViewComponent } from './table-view.component';

@Directive({
  selector: '[xRowDef]'
})
export class XRowDef implements OnInit {
  @Input('xRowDef') rowData: any;

  constructor(
    private vcr: ViewContainerRef,
    private tpl: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.vcr.createEmbeddedView(this.tpl, { $implicit: this.rowData });
  }
}

@Directive({
  selector: '[xHeaderRowDef]'
})
export class XHeaderRowDef implements OnInit {
  constructor(
    private vcr: ViewContainerRef,
    private tpl: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.vcr.createEmbeddedView(this.tpl);
  }
}

@Directive({
  selector: 'x-row, tr[x-row]'
})
export class XRow {
  tableViewService = inject(XTableViewService, { optional: true })!;
  tableView = inject(XTableViewComponent, { optional: true });

  @HostBinding('class.x-row-actived') get isActived() {
    return this.tableViewService.activedRows.includes(this);
  }
}

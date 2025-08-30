import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  HostBinding,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  ViewChildren
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { XColumnDef } from './column';
import { XHeaderRowDef, XRow, XRowDef } from './row';
import { XTableViewProperty } from './table-view.property';
import { XTableViewService } from './table-view.service';
import { XCell, XHeaderCell } from './cell';

@Component({
  selector: 'table[x-table-view]',
  templateUrl: './table-view.html',
  styleUrls: ['./table-view.scss'],
  imports: [NgTemplateOutlet, XRow, XRowDef, XHeaderRowDef],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XTableViewService]
})
export class XTableViewComponent extends XTableViewProperty implements AfterContentInit {
  @HostBinding('class.x-table-view') hostClass = true;

  @ContentChildren(XColumnDef) columnDefs!: QueryList<XColumnDef>;
  @ContentChildren(XHeaderCell) headerCells!: QueryList<XHeaderCell>;
  @ContentChildren(XCell) cells!: QueryList<XCell>;
  @ViewChildren(XRow) rows!: QueryList<XRow>;
  columnMap: Record<string, XColumnDef> = {};
  tableViewService = inject(XTableViewService);

  ngAfterContentInit() {
    for (const def of this.columnDefs.toArray()) {
      this.columnMap[def.name] = def;
    }
  }
}

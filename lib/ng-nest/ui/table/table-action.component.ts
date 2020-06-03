import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, HostBinding, Input, Optional, Host } from '@angular/core';
import { XTableAction } from './table.property';
import { XTableComponent } from './table.component';
import { XFilter } from '@ng-nest/ui/core';
import * as _ from 'lodash';

@Component({
  selector: `x-table-action`,
  templateUrl: './table-action.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTableActionComponent implements OnInit {
  @Input() space = 0;
  @Input() hiddenBorder = false;
  @Input() actions: XTableAction[] = [];

  constructor(@Optional() public table: XTableComponent) {}

  ngOnInit() {}

  actionEmit(action: XTableAction, event: Event) {
    action.event = event;
    if (action.actionLayoutType === 'top-right-icon') {
      this.table.activatedAction.activated = false;
      action.activated = true;
      this.table.activatedAction = action;
      if (action.group) {
        _.remove(this.table.query.filter as XFilter[], (x) => x.field === this.table.groupQuery.group);
        this.table.groupQuery.filter = [];
        this.table.groupIndex = 1;
        this.table.groupQuery.group = action.group;
        this.table.groupQuery.sort = [{ field: 'count', value: 'desc' }];
        let groupColumn = _.cloneDeep(this.table.columns?.find((x) => x.id === action.group));
        if (groupColumn) {
          groupColumn.flex = 4;
          groupColumn.search = true;
          this.table.groupSearchPlaceholder = `查找${groupColumn.label}`;
          this.table.groupColumns = [groupColumn, { id: 'count', flex: 2 }];
        }
        this.table.cdr.detectChanges();
      } else if (this.table.groupQuery.group) {
        _.remove(this.table.query.filter as XFilter[], (x) => x.field === this.table.groupQuery.group);
        this.table.groupQuery.group = undefined;
        this.table.groupQuery.filter = [];
        this.table.setData();
      }
    }
    this.table.actionClick.emit(action);
  }
}

import { Component, OnInit, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from '../layout.service';
import * as _ from 'lodash';

@Component({
  selector: 'ns-sider',
  templateUrl: './sider.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiderComponent implements OnInit {
  option: any = _.filter(this.layoutService.menus, x => x.parentId === null);

  nodeEmit = new EventEmitter<object>();

  level: number = 0;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {}
}

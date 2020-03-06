import { Menu } from './../../../../environments/routes';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from '../../layout.service';
import * as _ from 'lodash';

@Component({
  selector: '[ns-sider-node]',
  templateUrl: './sider-node.component.html',
  inputs: ['option', 'level'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiderNodeComponent implements OnInit {
  option: Menu = {};
  level: number;
  child = [];
  showCategory = false;

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.level = this.level + 1;
    this.child = this.layoutService.menus.filter(x => x.parentId === this.option.id);
    if (this.layoutService.category !== this.option.category) {
      this.layoutService.category = this.option.category;
      this.showCategory = true;
    }
  }

  toggle(event: Event, option) {
    event.stopPropagation();
    if (this.child.length > 0) option.childrenShow = !option.childrenShow;
  }

  sider(option) {}
}

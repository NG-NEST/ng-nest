import { Component } from '@angular/core';
import { XTabsNode } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ExActionComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
  activatedIndex = 2;
  addIndex = 0;

  actions = [
    {
      icon: 'fto-plus',
      action: () => {
        this.add();
      }
    }
  ];

  add() {
    this.addIndex++;
    this.labels = [...this.labels, `新建标签页${this.addIndex}`];
    this.activatedIndex = this.labels.length - 1;
  }

  close(_event: Event, node: XTabsNode) {
    const closeIndex = this.labels.indexOf(node.id);
    let activatedIndex = 0;
    if (closeIndex === this.activatedIndex) {
      if (closeIndex < this.labels.length - 1) {
        activatedIndex = closeIndex;
      } else {
        activatedIndex = closeIndex - 1;
      }
    } else if (closeIndex < this.activatedIndex) {
      activatedIndex = this.activatedIndex - 1;
    } else {
      activatedIndex = this.activatedIndex;
    }
    this.labels.splice(closeIndex, 1);
    this.activatedIndex = activatedIndex;
    // event.stopPropagation();
    // event.preventDefault();
  }
}

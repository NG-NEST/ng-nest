import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTabComponent, XTabsComponent, XTabsNode } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-action',
  imports: [XTabComponent, XTabsComponent, XIconComponent, XButtonComponent],
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ExActionComponent {
  labels = signal(['用户管理', '配置管理', '角色管理', '任务']);
  activatedIndex = signal(2);
  addIndex = signal(0);

  actions = [
    {
      icon: 'fto-plus',
      action: () => {
        this.add();
      }
    }
  ];

  add() {
    this.addIndex.update((x) => ++x);
    this.labels.update((x) => [...x, `新建标签页${this.addIndex()}`]);
    this.activatedIndex.set(this.labels().length - 1);
  }

  close(_event: Event, node: XTabsNode) {
    const closeIndex = this.labels().indexOf(node.id);
    let activatedIndex = 0;
    if (closeIndex === this.activatedIndex()) {
      if (closeIndex < this.labels().length - 1) {
        activatedIndex = closeIndex;
      } else {
        activatedIndex = closeIndex - 1;
      }
    } else if (closeIndex < this.activatedIndex()) {
      activatedIndex = this.activatedIndex() - 1;
    } else {
      activatedIndex = this.activatedIndex();
    }
    this.labels.update((x) => {
      x.splice(closeIndex, 1);
      return [...x];
    });
    this.activatedIndex.set(activatedIndex);
  }
}

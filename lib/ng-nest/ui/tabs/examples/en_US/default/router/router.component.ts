import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTabComponent, XTabLinkDirective, XTabLinkTemplateDirective, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-router',
  standalone: true,
  imports: [CommonModule, RouterModule, XTabsComponent, XTabComponent, XTabLinkDirective, XTabLinkTemplateDirective],
  templateUrl: './router.component.html'
})
export class ExRouterComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
}

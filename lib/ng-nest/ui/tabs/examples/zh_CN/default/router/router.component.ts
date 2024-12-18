import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTabComponent, XTabLinkDirective, XTabLinkTemplateDirective, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-router',
  imports: [RouterModule, XTabsComponent, XTabComponent, XTabLinkDirective, XTabLinkTemplateDirective],
  templateUrl: './router.component.html'
})
export class ExRouterComponent {
  labels = signal(['用户管理', '配置管理', '角色管理', '任务']);
}

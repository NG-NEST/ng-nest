import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { ContentComponent } from './content/content.component';
import { CrumbComponent } from './crumb/crumb.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { mainRoutes } from 'src/environments/routes';
import { XMenuComponent } from '@ng-nest/ui/menu';
import { XSliderComponent } from '@ng-nest/ui/slider';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XCrumbModule } from '@ng-nest/ui/crumb';

@NgModule({
  declarations: [IndexComponent, ContentComponent, CrumbComponent, HeaderComponent, SidebarComponent, TabsComponent],
  imports: [
    CommonModule,
    XMenuComponent,
    XSliderComponent,
    XIconComponent,
    XCrumbModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexComponent,
        children: mainRoutes
      }
    ])
  ],
  exports: [RouterModule]
})
export class IndexModule {}

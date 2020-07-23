import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { ContentComponent } from './content/content.component';
import { CrumbComponent } from './crumb/crumb.component';
import { HeaderComponent } from './header/header.component';
import { SiderComponent } from './sider/sider.component';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { mainRoutes } from 'src/environments/routes';

@NgModule({
  declarations: [IndexComponent, ContentComponent, CrumbComponent, HeaderComponent, SiderComponent, TabsComponent],
  imports: [
    CommonModule,
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

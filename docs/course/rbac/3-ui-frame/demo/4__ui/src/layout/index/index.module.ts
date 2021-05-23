import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { ContentComponent } from './content/content.component';
import { CrumbComponent } from './crumb/crumb.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    IndexComponent,
    ContentComponent,
    CrumbComponent,
    HeaderComponent,
    SidebarComponent,
    TabsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class IndexModule {}

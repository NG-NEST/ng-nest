import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { ExDefaultComponent } from './default/default.component';
import { TeTabsComponent } from './tabs.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExActionComponent } from './action/action.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { XIconModule } from '@ng-nest/ui/icon';
import { ExExpandComponent } from './expand/expand.component';
import { ExRouterComponent } from './router/router.component';
import { ExExampleComponent } from './example/example.component';
import { XExamplesModule } from '@ng-nest/ui/examples';
import { XHighlightModule } from '@ng-nest/ui/highlight';
import { XTableModule } from '@ng-nest/ui/table';
import { ExScrollComponent } from './default/scroll/scroll.component';
import { XLinkModule } from '@ng-nest/ui/link';

const routers = [{ path: '', component: TeTabsComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    XTabsModule,
    XLayoutModule,
    XExamplesModule,
    XButtonModule,
    XIconModule,
    XHighlightModule,
    XTableModule,
    XLinkModule
  ],
  declarations: [
    TeTabsComponent,
    ExDefaultComponent,
    ExActionComponent,
    ExExpandComponent,
    ExRouterComponent,
    ExExampleComponent,
    ExScrollComponent
  ]
})
export class TeTabsModule {}

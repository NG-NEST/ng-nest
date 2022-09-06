import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XAvatarModule } from '@ng-nest/ui/avatar';
import { ExDefaultComponent } from './default/default.component';
import { TeAvatarComponent } from './avatar.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XBadgeModule } from '@ng-nest/ui/badge';
import { ExBadgeComponent } from './badge/badge.component';

const routers = [{ path: '', component: TeAvatarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XAvatarModule, XLayoutModule, XBadgeModule],
  declarations: [TeAvatarComponent, ExDefaultComponent, ExBadgeComponent]
})
export class TeAvatarModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XAvatarModule } from '@ng-nest/ui/avatar';
import { ExDefaultComponent } from './default/default.component';
import { TeAvatarComponent } from './avatar.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XBadgeModule } from '@ng-nest/ui/badge';
import { ExBadgeComponent } from './badge/badge.component';
import { ExResponseComponent } from './response/response.component';
import { ExLabelComponent } from './label/label.component';
import { XButtonModule } from '@ng-nest/ui/button';

const routers = [{ path: '', component: TeAvatarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XAvatarModule, XButtonModule, XLayoutModule, XBadgeModule],
  declarations: [TeAvatarComponent, ExDefaultComponent, ExBadgeComponent, ExResponseComponent, ExLabelComponent]
})
export class TeAvatarModule {}

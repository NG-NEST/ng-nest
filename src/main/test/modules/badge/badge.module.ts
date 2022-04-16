import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XBadgeModule } from '@ng-nest/ui/badge';
import { ExDefaultComponent } from './default/default.component';
import { TeBadgeComponent } from './badge.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XButtonModule } from '@ng-nest/ui/button';
import { CommonModule } from '@angular/common';
import { ExOffsetComponent } from './offset/offset.component';

const routers = [{ path: '', component: TeBadgeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XBadgeModule, XButtonModule, XLayoutModule],
  declarations: [TeBadgeComponent, ExDefaultComponent, ExOffsetComponent]
})
export class TeBadgeModule {}

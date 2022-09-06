import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XBadgeModule } from '@ng-nest/ui/badge';
import { ExDefaultComponent } from './default/default.component';
import { TeBadgeComponent } from './badge.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XButtonModule } from '@ng-nest/ui/button';
import { CommonModule } from '@angular/common';
import { ExOffsetComponent } from './offset/offset.component';
import { ExStandaloneComponent } from './standalone/standalone.component';
import { XSwitchModule } from '@ng-nest/ui/switch';
import { FormsModule } from '@angular/forms';

const routers = [{ path: '', component: TeBadgeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XBadgeModule, XButtonModule, XLayoutModule, XSwitchModule],
  declarations: [TeBadgeComponent, ExDefaultComponent, ExOffsetComponent, ExStandaloneComponent]
})
export class TeBadgeModule {}

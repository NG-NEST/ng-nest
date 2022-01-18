import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XMessageModule } from '@ng-nest/ui/message';
import { ExDefaultComponent } from './default/default.component';
import { TeMessageComponent } from './message.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonModule } from '@ng-nest/ui/button';
import { ExLoadingComponent } from './loading/loading.component';

const routers = [{ path: '', component: TeMessageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XMessageModule, XButtonModule, XLayoutModule],
  declarations: [TeMessageComponent, ExDefaultComponent, ExLoadingComponent]
})
export class TeMessageModule {}

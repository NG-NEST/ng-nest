import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XAnchorModule } from '@ng-nest/ui/anchor';
import { ExDefaultComponent } from './default/default.component';
import { ExLoadingComponent } from './loading/loading.component';
import { TeAnchorComponent } from './anchor.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonModule } from '@ng-nest/ui/button';

const routers = [{ path: '', component: TeAnchorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XAnchorModule, XLayoutModule, XButtonModule],
  declarations: [TeAnchorComponent, ExDefaultComponent, ExLoadingComponent]
})
export class TeAnchorModule {}

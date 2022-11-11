import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XAnchorModule } from '@ng-nest/ui/anchor';
import { ExDefaultComponent } from './default/default.component';
import { TeAnchorComponent } from './anchor.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';

const routers = [{ path: '', component: TeAnchorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XAnchorModule, XLayoutModule],
  declarations: [TeAnchorComponent, ExDefaultComponent]
})
export class TeAnchorModule {}

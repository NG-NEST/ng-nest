import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XImageModule } from '@ng-nest/ui/image';
import { ExDefaultComponent } from './default/default.component';
import { TeImageComponent } from './image.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';

const routers = [{ path: '', component: TeImageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XImageModule, XLayoutModule],
  declarations: [TeImageComponent, ExDefaultComponent]
})
export class TeImageModule {}

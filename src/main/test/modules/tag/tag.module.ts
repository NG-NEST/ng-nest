import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTagModule } from '@ng-nest/ui/tag';
import { ExDefaultComponent } from './default/default.component';
import { ExColorComponent } from './color/color.component';
import { TeTagComponent } from './tag.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExCheckedComponent } from './checked/checked.component';

const routers = [{ path: '', component: TeTagComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XTagModule, XLayoutModule],
  declarations: [TeTagComponent, ExDefaultComponent, ExColorComponent, ExCheckedComponent]
})
export class TeTagModule {}

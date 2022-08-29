import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XImageModule } from '@ng-nest/ui/image';
import { ExDefaultComponent } from './default/default.component';
import { TeImageComponent } from './image.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { XButtonModule } from '@ng-nest/ui/button';
import { ExFallbackComponent } from './fallback/fallback.component';
import { ExPlaceholderComponent } from './placeholder/placeholder.component';
import { ExGroupComponent } from './group/group.component';

const routers = [{ path: '', component: TeImageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XImageModule, XButtonModule, XLayoutModule],
  declarations: [TeImageComponent, ExDefaultComponent, ExFallbackComponent, ExPlaceholderComponent, ExGroupComponent]
})
export class TeImageModule {}

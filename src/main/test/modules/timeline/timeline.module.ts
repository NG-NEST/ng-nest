import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTimelineModule } from '@ng-nest/ui/timeline';
import { ExDefaultComponent } from './default/default.component';
import { TeTimelineComponent } from './timeline.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExLoadingComponent } from './loading/loading.component';

const routers = [{ path: '', component: TeTimelineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XTimelineModule, XLayoutModule],
  declarations: [TeTimelineComponent, ExDefaultComponent, ExLoadingComponent]
})
export class TeTimelineModule {}

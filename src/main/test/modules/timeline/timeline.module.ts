import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTimelineModule } from '@ng-nest/ui/timeline';
import { ExDefaultComponent } from './default/default.component';
import { TeTimelineComponent } from './timeline.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExLoadingComponent } from './loading/loading.component';
import { ExModeComponent } from './mode/mode.component';
import { XRadioModule } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';
import { XTimeAgoModule } from '@ng-nest/ui/time-ago';
import { XCardModule } from '@ng-nest/ui/card';

const routers = [{ path: '', component: TeTimelineComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    XTimelineModule,
    XLayoutModule,
    XRadioModule,
    XTimeAgoModule,
    XCardModule,
    FormsModule
  ],
  declarations: [TeTimelineComponent, ExDefaultComponent, ExLoadingComponent, ExModeComponent]
})
export class TeTimelineModule {}

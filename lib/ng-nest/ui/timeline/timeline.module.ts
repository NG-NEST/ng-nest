import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTimelineComponent } from './timeline.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XTimeAgoModule } from '@ng-nest/ui/time-ago';
import { XLinkModule } from '@ng-nest/ui/link';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XTimelineProperty } from './timeline.property';

@NgModule({
  declarations: [XTimelineComponent, XTimelineProperty],
  exports: [XTimelineComponent],
  imports: [CommonModule, XIconModule, XTimeAgoModule, XLinkModule, XOutletModule]
})
export class XTimelineModule {}

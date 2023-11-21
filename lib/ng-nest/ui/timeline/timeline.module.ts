import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTimelineComponent } from './timeline.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTimeAgoModule } from '@ng-nest/ui/time-ago';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XTimelineProperty } from './timeline.property';

@NgModule({
  declarations: [XTimelineComponent, XTimelineProperty],
  exports: [XTimelineComponent],
  imports: [CommonModule, XIconComponent, XTimeAgoModule, XLinkComponent, XOutletDirective]
})
export class XTimelineModule {}

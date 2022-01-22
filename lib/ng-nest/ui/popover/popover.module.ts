import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPopoverDirective } from './popover.directive';
import { XPopoverPortalComponent } from './popover-portal.component';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XPopoverProperty } from './popover.property';

@NgModule({
    declarations: [XPopoverDirective, XPopoverPortalComponent, XPopoverProperty],
    exports: [XPopoverDirective, XPopoverPortalComponent],
    imports: [CommonModule, XPortalModule, XOutletModule]
})
export class XPopoverModule {}

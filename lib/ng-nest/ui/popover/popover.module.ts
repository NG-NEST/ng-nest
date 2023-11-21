import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPopoverDirective } from './popover.directive';
import { XPopoverPortalComponent } from './popover-portal.component';
import { XPortalModule } from '@ng-nest/ui/portal';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XPopoverProperty } from './popover.property';

@NgModule({
    declarations: [XPopoverDirective, XPopoverPortalComponent, XPopoverProperty],
    exports: [XPopoverDirective, XPopoverPortalComponent],
    imports: [CommonModule, XPortalModule, XOutletDirective]
})
export class XPopoverModule {}

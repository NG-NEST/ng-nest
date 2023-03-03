import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTreeModule } from '@ng-nest/ui/tree';
import { ExDefaultComponent } from './default/default.component';
import { TeTreeComponent } from './tree.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExVirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import { ExControlComponent } from './control/control.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { XInputNumberModule } from '@ng-nest/ui/input-number';
import { FormsModule } from '@angular/forms';
import { ExStatusComponent } from './status/status.component';
import { ExOpenComponent } from './open/open.component';
import { ExLazyComponent } from './lazy/lazy.component';
import { ExHeightComponent } from './height/height.component';
import { ExCustomComponent } from './custom/custom.component';
import { ExCheckboxComponent } from './checkbox/checkbox.component';
import { XLinkModule } from '@ng-nest/ui/link';
import { ExActivatedComponent } from './activated/activated.component';
import { ExDragComponent } from './drag/drag.component';

const routers = [{ path: '', component: TeTreeComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XLinkModule,
    XTreeModule,
    XLayoutModule,
    XButtonModule,
    XInputNumberModule
  ],
  declarations: [
    TeTreeComponent,
    ExDefaultComponent,
    ExVirtualScrollComponent,
    ExControlComponent,
    ExStatusComponent,
    ExOpenComponent,
    ExLazyComponent,
    ExHeightComponent,
    ExCustomComponent,
    ExCheckboxComponent,
    ExActivatedComponent,
    ExDragComponent
  ]
})
export class TeTreeModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { ExDefaultComponent } from './default/default.component';
import { TeDialogComponent } from './dialog.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XButtonModule } from '@ng-nest/ui/button';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { ExServiceComponent } from './service/service.component';
import { ExServiceDialogComponent } from './service/service-dialog.component';
import { ExResizableComponent } from './resizable/resizable.component';

const routers = [{ path: '', component: TeDialogComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XMessageBoxModule,
    XDialogModule,
    XLayoutModule,
    XRadioModule,
    XButtonModule
  ],
  declarations: [TeDialogComponent, ExDefaultComponent, ExServiceComponent, ExServiceDialogComponent, ExResizableComponent]
})
export class TeDialogModule {}

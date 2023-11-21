import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { ExDefaultComponent } from './default/default.component';
import { TeDialogComponent } from './dialog.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { ExServiceComponent } from './service/service.component';
import { ExServiceDialogComponent } from './service/service-dialog.component';
import { ExResizableComponent } from './resizable/resizable.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ExCustomComponent } from './custom/custom.component';
import { ExContainerComponent } from './container/container.component';
import { XInputModule } from '@ng-nest/ui/input';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XFormModule } from '@ng-nest/ui/form';
import { ExFormComponent } from './form/form.component';

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
    XButtonComponent,
    DragDropModule,
    XInputModule,
    XIconComponent,
    XLinkComponent,
    XFormModule
  ],
  declarations: [
    TeDialogComponent,
    ExDefaultComponent,
    ExServiceComponent,
    ExServiceDialogComponent,
    ExResizableComponent,
    ExCustomComponent,
    ExContainerComponent,
    ExFormComponent
  ]
})
export class TeDialogModule {}
